import Component from '@glimmer/component';
import { action } from '@ember/object';
import { cancel, later } from '@ember/runloop';
import { getPosition, getCoords } from '@zestia/position-utils';
import { guidFor } from '@ember/object/internals';
import { htmlSafe, dasherize } from '@ember/string';
import { inject } from '@ember/service';
import { Promise, defer, resolve } from 'rsvp';
import { tracked } from '@glimmer/tracking';
import autoPosition from '../utils/auto-position';

export default class TooltipperComponent extends Component {
  @inject('tooltip') tooltipService;

  @tracked isLoading = false;
  @tracked loadedData = null;
  @tracked loadError = null;
  @tracked shouldRenderTooltip = false;
  @tracked shouldShowTooltip = false;
  @tracked tooltipCoords = [0, 0];
  @tracked tooltipPosition = null;

  isLoaded = false;
  isOverReferenceElement = false;
  isOverTooltipElement = false;
  loadEndTime = 0;
  loadStartTime = 0;
  referenceElement = null;
  tooltipElement = null;
  tooltipperElement = null;

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

  get tooltipComponent() {
    return this.args.tooltip ?? 'tooltip';
  }

  get tooltipStyle() {
    const [x, y] = this.tooltipCoords;

    return htmlSafe(`top: ${y}px; left: ${x}px`);
  }

  get tooltipPositionClass() {
    return dasherize(this.tooltipPosition);
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

  get showRemainder() {
    if (this.loadDelay > this.showDelay) {
      return 0;
    } else {
      return this.showDelay - this.loadDelay;
    }
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
    this._maybeToggleViaArgument();
  }

  @action
  handleUpdatedArguments() {
    this._setupReferenceElement();
    this._maybeToggleViaArgument();
    this._positionTooltip();
  }

  @action
  handleDestroyTooltipper() {
    this._cancelTimers();
    this._teardownReferenceElement();
  }

  @action
  handleInsertTooltip(element) {
    this.tooltipElement = element;
    this.willInsertTooltip.resolve();
    this.tooltipService.add(this);
    this._positionTooltip();
  }

  @action
  handleDestroyTooltip() {
    this.tooltipElement = null;
    this.isOverTooltipElement = false;
    this.tooltipService.remove(this);
  }

  @action
  handleMouseEnterTooltip() {
    this.isOverTooltipElement = true;
  }

  @action
  handleMouseLeaveTooltip() {
    this.isOverTooltipElement = false;

    if (this.shouldUseMouseEvents) {
      this._scheduleHideTooltip();
    }
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

  _invokeAction(name, ...args) {
    const action = this.args[name];

    if (typeof action === 'function') {
      return action(...args);
    }
  }

  _maybeToggleViaArgument() {
    if (this.args.showTooltip === true) {
      this._showTooltip();
    } else if (this.args.showTooltip === false) {
      this._hideTooltip();
    }
  }

  _startListening() {
    this._enterHandler = this._handleMouseEnterReferenceElement.bind(this);
    this._leaveHandler = this._handleMouseLeaveReferenceElement.bind(this);

    this.referenceElement.addEventListener('mouseenter', this._enterHandler);
    this.referenceElement.addEventListener('mouseleave', this._leaveHandler);
  }

  _stopListening() {
    this.referenceElement.removeEventListener('mouseenter', this._enterHandler);
    this.referenceElement.removeEventListener('mouseleave', this._leaveHandler);
  }

  _handleMouseEnterReferenceElement() {
    this.isOverReferenceElement = true;

    this._loadOnce().then(() => this._scheduleShowTooltip());
  }

  _handleMouseLeaveReferenceElement() {
    this.isOverReferenceElement = false;

    this._scheduleHideTooltip();
  }

  _loadOnce() {
    const load =
      this.isLoaded || this.isLoading
        ? resolve(this.loadedData)
        : resolve(this._invokeAction('onLoad'));

    this._loadStarted();

    return load
      .then(this._loadedData.bind(this))
      .catch(this._loadError.bind(this))
      .finally(this._loadFinished.bind(this));
  }

  _loadStarted() {
    this.loadStartTime = Date.now();
    this.isLoading = true;
  }

  _loadFinished() {
    this.isLoading = false;
    this.loadEndTime = Date.now();
  }

  _loadedData(data) {
    this.loadedData = data;
    this.isLoaded = true;
  }

  _loadError(error) {
    this.loadError = error;
  }

  _scheduleShowTooltip() {
    this.showTimer = later(this, '_attemptShowTooltip', this.showRemainder);
  }

  _attemptShowTooltip() {
    if (!this.isOverReferenceElement) {
      return;
    }

    if (this.renderedChild) {
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

    this._cancelTimers();

    this._loadOnce()
      .then(() => this._renderTooltip())
      .then(() => this._waitForAnimation())
      .then(() => this._invokeAction('onShowTooltip'));
  }

  _renderTooltip() {
    this.willInsertTooltip = defer();
    this.shouldRenderTooltip = true;

    return this.willInsertTooltip.promise;
  }

  _scheduleHideTooltip() {
    this.hideTimer = later(this, '_attemptHideTooltip', this.hideDelay);
  }

  _cancelTimers() {
    cancel(this.showTimer);
    cancel(this.hideTimer);
  }

  _attemptHideTooltip() {
    if (this.isOverReferenceElement || this.isOverTooltipElement) {
      return;
    }

    this._hideTooltip();
  }

  _hideTooltip() {
    if (!this.tooltipElement) {
      return;
    }

    this._cancelTimers();

    this.shouldShowTooltip = false;

    return this._waitForAnimation().then(() => {
      this._invokeAction('onHideTooltip');
      this._attemptDestroyTooltip();
    });
  }

  _waitForAnimation() {
    return new Promise((resolve) => {
      this.tooltipElement.addEventListener('animationend', resolve, {
        once: true
      });
    });
  }

  _attemptDestroyTooltip() {
    if (this.shouldShowTooltip) {
      return;
    }

    this._destroyTooltip();
  }

  _destroyTooltip() {
    this.shouldRenderTooltip = false;
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

  _getReferencePosition(referenceElement) {
    // Get the rough position of the reference element in the viewport by
    // splitting it in to a grid of rows and columns and choosing a square.

    return getPosition(referenceElement, window, this.columns, this.rows);
  }

  _decideTooltipPosition(referencePosition) {
    // The position of the tooltip should be the one provided, or one chosen
    // automatically, based upon the position of the reference element.

    return this.args.position ?? autoPosition(referencePosition);
  }

  _computeCoords() {
    try {
      // Compute the coordinates required to place the tooltip element near the
      // reference element.
      return getCoords(...arguments);
    } catch (error) {
      // The reference element was probably hidden, therefore it's was
      // not possible to compute coordinates.
      return [0, 0];
    }
  }

  _positionTooltip() {
    const { tooltipElement, referenceElement } = this;

    if (!tooltipElement || !referenceElement) {
      return;
    }

    const referencePosition = this._getReferencePosition(referenceElement);

    const tooltipPosition = this._decideTooltipPosition(referencePosition);

    this.tooltipCoords = this._computeCoords(
      tooltipPosition,
      tooltipElement,
      referenceElement
    );

    this.tooltipPosition = tooltipPosition;
  }
}
