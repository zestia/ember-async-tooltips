import Component from '@glimmer/component';
import { cancel, later, next } from '@ember/runloop';
import { getPosition, getCoords } from '@zestia/position-utils';
import { guidFor } from '@ember/object/internals';
import { htmlSafe } from '@ember/template';
import { inject } from '@ember/service';
import { defer, resolve } from 'rsvp';
import { tracked } from '@glimmer/tracking';
import { waitFor } from '@ember/test-waiters';
import { waitForAnimation } from '@zestia/animation-utils';
import autoPosition from '../utils/auto-position';
import { action } from '@ember/object';

export default class TooltipperComponent extends Component {
  @inject('tooltip') tooltipService;

  @tracked isLoading = false;
  @tracked loadedData = null;
  @tracked loadError = null;
  @tracked shouldRenderTooltip = false;
  @tracked shouldShowTooltip = false;
  @tracked tooltipCoords = [0, 0];
  @tracked tooltipElement = null;
  @tracked tooltipPosition = null;

  hideTimer = null;
  isLoaded = false;
  isOverReferenceElement = false;
  isOverTooltipElement = false;
  loadEndTime = 0;
  loadStartTime = 0;
  referenceElement = null;
  showTimer = null;
  stickyTimer = null;
  tooltipperElement = null;
  willInsertTooltip = null;

  get TooltipComponent() {
    return this.args.Tooltip;
  }

  get canRenderTooltip() {
    return (
      !this.isDestroyed &&
      !!this.args.Tooltip &&
      this.shouldUseMouseEvents &&
      this.needsToShowTooltip &&
      !this.hasChild
    );
  }

  get hasTooltip() {
    return !!this.tooltipElement;
  }

  get id() {
    return guidFor(this).replace('ember', '');
  }

  get columns() {
    return this.args.columns ?? 3;
  }

  get rows() {
    return this.args.rows ?? 3;
  }

  get shouldUseMouseEvents() {
    return this.args.mouseEvents ?? true;
  }

  get tooltipStyle() {
    const [x, y] = this.tooltipCoords;

    return htmlSafe(`top: ${y}px; left: ${x}px`);
  }

  get loadDelay() {
    return this.loadEndTime - this.loadStartTime;
  }

  get hideDelay() {
    return this.args.hideDelay ?? 0;
  }

  get showDelay() {
    return this.args.showDelay ?? 0;
  }

  get stickyTimeout() {
    return this.args.stickyTimeout ?? this.showDelay / 2;
  }

  get showRemainder() {
    if (this.loadDelay > this.showDelay || this.isSticky) {
      return 0;
    }

    return this.showDelay - this.loadDelay;
  }

  get needsToShowTooltip() {
    return this.isOverReferenceElement || this.isOverTooltipElement;
  }

  get tooltippers() {
    return this.tooltipService.tooltippers.filter((tooltipper) => {
      return tooltipper !== this;
    });
  }

  get renderedChild() {
    return this.tooltippers.find((tooltipper) => {
      return this.referenceElement.contains(tooltipper.referenceElement);
    });
  }

  get renderedParent() {
    return this.tooltippers.find((tooltipper) => {
      return tooltipper.referenceElement.contains(this.referenceElement);
    });
  }

  get hasChild() {
    return !!this.renderedChild;
  }

  get stickyTooltippers() {
    return this.tooltipService.tooltippers.filter((tooltipper) => {
      return (
        tooltipper.args.stickyID === this.args.stickyID && tooltipper.isSticky
      );
    });
  }

  get isSticky() {
    return this.tooltipService.sticky[this.args.stickyID] === true;
  }

  get tooltipperAPI() {
    return {
      isLoading: this.isLoading,
      showTooltip: this.showTooltip,
      hideTooltip: this.hideTooltip,
      toggleTooltip: this.toggleTooltip,
      repositionTooltip: this.repositionTooltip
    };
  }

  get tooltipAPI() {
    return {
      data: this.loadedData,
      error: this.loadError,
      hide: this.hideTooltip,
      reposition: this.repositionTooltip
    };
  }

  @action
  handleInsertTooltipper(element) {
    this.tooltipperElement = element;
    this._setupReferenceElement();
    this._handleManualToggling();
  }

  @action
  handleUpdatedArguments() {
    this._setupReferenceElement();
    this._handleManualToggling();
    this._positionTooltip();
  }

  @action
  handleInsertTooltip(element) {
    this.tooltipElement = element;
    this.tooltipService.add(this);
    this._positionTooltip();
    this.willInsertTooltip.resolve();
  }

  @action
  handleDestroyTooltip() {
    this.tooltipElement = null;
    this.isOverTooltipElement = false;
    this.shouldRenderTooltip = false;
    this.tooltipService.remove(this);
  }

  @action
  handleDestroyTooltipper() {
    this._cancelTimers();
    this._teardownReferenceElement();
  }

  @action
  handleMouseEnterReferenceElement() {
    this.isOverReferenceElement = true;

    this._loadOnce().then(() => this._scheduleShowTooltip());
  }

  @action
  handleMouseLeaveReferenceElement() {
    this.isOverReferenceElement = false;

    this._scheduleHideTooltip();
  }

  @action
  handleMouseEnterTooltip() {
    this.isOverTooltipElement = true;
  }

  @action
  handleMouseLeaveTooltip() {
    this.isOverTooltipElement = false;

    if (!this.shouldUseMouseEvents) {
      return;
    }

    this._scheduleHideTooltip();
  }

  @action
  hideTooltip() {
    return this._hideTooltip();
  }

  @action
  showTooltip() {
    this._showTooltip();
  }

  @action
  toggleTooltip() {
    if (this.shouldRenderTooltip) {
      this._hideTooltip();
    } else {
      this._showTooltip();
    }
  }

  @action
  repositionTooltip() {
    this._positionTooltip();
  }

  _handleManualToggling() {
    next(() => this._maybeToggleViaArg());
  }

  _maybeToggleViaArg() {
    if (this.args.showTooltip === true) {
      this._showTooltip();
    } else if (this.args.showTooltip === false) {
      this._hideTooltip();
    }
  }

  _startListening() {
    const add = (...args) => this.referenceElement.addEventListener(...args);

    add('mouseenter', this.handleMouseEnterReferenceElement);
    add('mouseleave', this.handleMouseLeaveReferenceElement);
  }

  _stopListening() {
    const remove = (...args) =>
      this.referenceElement.removeEventListener(...args);

    remove('mouseenter', this.handleMouseEnterReferenceElement);
    remove('mouseleave', this.handleMouseLeaveReferenceElement);
  }

  _load(data) {
    this._loadStarted();

    return resolve(data)
      .then(this._loadedData.bind(this))
      .catch(this._loadError.bind(this))
      .finally(this._loadFinished.bind(this));
  }

  _loadOnce() {
    if (this.isLoading) {
      return new Promise(() => {});
    } else if (this.isLoaded) {
      return this._load(this.loadedData);
    } else if (typeof this.args.onLoad === 'function') {
      return this._load(this.args.onLoad());
    } else {
      return resolve();
    }
  }

  _loadStarted() {
    this.loadStartTime = Date.now();
    this.isLoading = true;
  }

  _loadFinished() {
    this.loadEndTime = Date.now();
    this.isLoading = false;
  }

  _loadedData(data) {
    this.loadedData = data;
    this.loadError = null;
    this.isLoaded = true;
  }

  _loadError(error) {
    this.loadError = error;
    this.loadedData = null;
    this.isLoaded = false;
  }

  _scheduleShowTooltip() {
    this._cancelTimers();

    this.showTimer = later(this, '_attemptShowTooltip', this.showRemainder);
  }

  _attemptShowTooltip() {
    if (!this.canRenderTooltip) {
      return;
    }

    if (this.renderedParent) {
      this.renderedParent.hideTooltip();
    }

    this._showTooltip();
  }

  _showTooltip() {
    this.shouldShowTooltip = true;

    if (this.shouldRenderTooltip) {
      return;
    }

    this._loadOnce()
      .then(() => this._renderTooltip())
      .then(() => this._waitForAnimation())
      .then(() => this._handleShow());
  }

  _renderTooltip() {
    this.willInsertTooltip = defer();
    this.shouldRenderTooltip = true;

    return this.willInsertTooltip.promise;
  }

  _scheduleHideTooltip() {
    this._cancelTimers();

    this.hideTimer = later(this, '_attemptHideTooltip', this.hideDelay);
  }

  _attemptHideTooltip() {
    if (this.needsToShowTooltip) {
      return;
    }

    this._hideTooltip();
  }

  _hideTooltip() {
    if (!this.tooltipElement) {
      return;
    }

    this.shouldShowTooltip = false;

    return this._waitForAnimation()
      .then(() => this._handleHide())
      .then(() => this._attemptDestroyTooltip());
  }

  _cancelTimers() {
    cancel(this.showTimer);
    cancel(this.hideTimer);
    cancel(this.stickyTimer);
  }

  _scheduleResetSticky() {
    this.stickyTimer = later(this, '_attemptResetSticky', this.stickyTimeout);
  }

  _attemptResetSticky() {
    if (this.stickyTooltippers.length) {
      return;
    }

    this.tooltipService.setSticky(this, false);
  }

  _handleShow() {
    if (this.args.stickyID) {
      this.tooltipService.setSticky(this, true);
    }

    this.args.onShowTooltip?.();
  }

  _handleHide() {
    if (this.args.stickyID) {
      this._scheduleResetSticky();
    }

    this.args.onHideTooltip?.();
  }

  @waitFor
  async _waitForAnimation() {
    await waitForAnimation(this.tooltipElement);
  }

  _attemptDestroyTooltip() {
    if (this.shouldShowTooltip) {
      return;
    }

    this._destroyTooltip();
  }

  _destroyTooltip() {
    this.shouldRenderTooltip = false;
    this.shouldShowTooltip = false;
  }

  _setupReferenceElement() {
    this._teardownReferenceElement();

    this.referenceElement =
      this.args.referenceElement ?? this.tooltipperElement;

    if (!this.shouldUseMouseEvents) {
      return;
    }

    this._startListening();
  }

  _teardownReferenceElement() {
    if (!this.referenceElement) {
      return;
    }

    this._stopListening();
    this.referenceElement = null;
  }

  _getReferencePosition() {
    // Get the rough position of the reference element in the viewport by
    // splitting it in to a grid of rows and columns and choosing a square.

    return getPosition(this.referenceElement, window, this.columns, this.rows);
  }

  _computeCoords(position) {
    // Compute the coordinates required to place the tooltip element at the
    // given position near the reference element.

    return getCoords(position, this.tooltipElement, this.referenceElement);
  }

  _decideTooltipPosition(referencePosition) {
    // The position of the tooltip should be the one provided, or one chosen
    // automatically, based upon the position of the reference element.

    const { position } = this.args;

    if (typeof position === 'string') {
      return position;
    } else if (typeof position === 'function') {
      return position(referencePosition);
    } else {
      return autoPosition(referencePosition);
    }
  }

  _positionTooltip() {
    if (!this.tooltipElement || !this.referenceElement) {
      return;
    }

    const referencePosition = this._getReferencePosition();

    const tooltipPosition = this._decideTooltipPosition(referencePosition);

    this.tooltipCoords = this._computeCoords(tooltipPosition);

    this.tooltipPosition = tooltipPosition;
  }
}
