import Component from '@glimmer/component';
import { action } from '@ember/object';
import { cancel, debounce } from '@ember/runloop';
import { getPosition, getCoords } from '@zestia/position-utils';
import { guidFor } from '@ember/object/internals';
import { isPresent } from '@ember/utils';
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
  previousReferenceElement = null;
  referenceElement = null;
  tooltipElement = null;
  tooltipperElement = null;

  get id() {
    return guidFor(this).replace('ember', '');
  }

  get columns() {
    return isPresent(this.args.columns) ? this.args.columns : 3;
  }

  get rows() {
    return isPresent(this.args.rows) ? this.args.rows : 3;
  }

  get shouldUseMouseEvents() {
    return isPresent(this.args.mouseEvents) ? this.args.mouseEvents : true;
  }

  get hideDelay() {
    return isPresent(this.args.hideDelay) ? this.args.hideDelay : 0;
  }

  get showDelay() {
    if (isPresent(this.args.showDelay)) {
      if (this._isSticky()) {
        return 0;
      } else {
        return this.args.showDelay;
      }
    } else {
      return 0;
    }
  }

  get tooltipComponent() {
    return isPresent(this.args.tooltip) ? this.args.tooltip : 'tooltip';
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

  get showRemainder() {
    if (this.loadDelay > this.showDelay) {
      return 0;
    } else {
      return this.showDelay - this.loadDelay;
    }
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
    this._autoSetupReferenceElement();
    this._maybeToggleViaArgument();
  }

  @action
  handleUpdatedArguments() {
    this._autoSetupReferenceElement();
    this._maybeToggleViaArgument();
    this._positionTooltip();
  }

  @action
  handleDestroyTooltipper() {
    this._cancelShowTooltip();
    this._cancelHideTooltip();
    this._autoTearDownReferenceElement();
  }

  @action
  handleInsertTooltip(element) {
    this.tooltipElement = element;
    this.willInsertTooltip.resolve();
    this._positionTooltip();
  }

  @action
  handleDestroyTooltip() {
    this.tooltipElement = null;
    this.isOverTooltipElement = false;
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

  _startListening(element) {
    this._enterHandler = this._mouseEnterReferenceElement.bind(this);
    this._leaveHandler = this._mouseLeaveReferenceElement.bind(this);

    element.addEventListener('mouseenter', this._enterHandler);
    element.addEventListener('mouseleave', this._leaveHandler);
  }

  _stopListening(element) {
    element.removeEventListener('mouseenter', this._enterHandler);
    element.removeEventListener('mouseleave', this._leaveHandler);
  }

  _mouseEnterReferenceElement() {
    this.isOverReferenceElement = true;

    this._loadOnce().then(() => this._scheduleShowTooltip());
  }

  _mouseLeaveReferenceElement() {
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
    this.showTimer = debounce(this, '_attemptShowTooltip', this.showRemainder);
  }

  _cancelShowTooltip() {
    cancel(this.showTimer);
  }

  _attemptShowTooltip() {
    if (!this.isOverReferenceElement) {
      return;
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
      .then(() => this._invokeAction('onShowTooltip'));
  }

  _renderTooltip() {
    this.willInsertTooltip = defer();
    this.shouldRenderTooltip = true;
    this.tooltipService.add(this);

    return this.willInsertTooltip.promise;
  }

  _scheduleHideTooltip() {
    this.hideTimer = debounce(this, '_attemptHideTooltip', this.hideDelay);
  }

  _cancelHideTooltip() {
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
    this.tooltipService.remove(this);
    this.shouldRenderTooltip = false;
  }

  _isSticky() {
    const stickyId = this.args.stickyId;

    if (!isPresent(stickyId)) {
      return false;
    }

    return this.tooltipService.tooltippers.some(
      (tooltipper) => tooltipper.args.stickyId === stickyId
    );
  }

  _autoSetupReferenceElement() {
    this.referenceElement =
      this.args.referenceElement || this.tooltipperElement;

    if (
      !this.referenceElement ||
      this.referenceElement === this.previousReferenceElement
    ) {
      return;
    }

    if (this.previousReferenceElement) {
      this._teardownReferenceElement(this.previousReferenceElement);
    }

    this.previousReferenceElement = this.referenceElement;

    this._setupReferenceElement(this.referenceElement);
  }

  _autoTearDownReferenceElement() {
    this._teardownReferenceElement(this.referenceElement);
  }

  _setupReferenceElement(element) {
    if (!this.shouldUseMouseEvents) {
      return;
    }

    this._startListening(element);
  }

  _teardownReferenceElement(element) {
    if (!this.shouldUseMouseEvents) {
      return;
    }

    this._stopListening(element);
  }

  _getReferencePosition(referenceElement) {
    // Get the rough position of the reference element in the viewport by
    // splitting it in to a grid of rows and columns and choosing a square.

    return getPosition(referenceElement, window, this.columns, this.rows);
  }

  _decideToolipPosition(referencePosition) {
    // The position of the tooltip should be the one provided, or one chosen
    // automatically, based upon the position of the reference element.

    return isPresent(this.args.position)
      ? this.args.position
      : autoPosition(referencePosition);
  }

  _recomputeCoords() {
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

    const tooltipPosition = this._decideToolipPosition(referencePosition);

    this.tooltipCoords = this._recomputeCoords(
      tooltipPosition,
      tooltipElement,
      referenceElement
    );

    this.tooltipPosition = tooltipPosition;
  }
}
