import Component from '@glimmer/component';
import { action } from '@ember/object';
import { cancel, debounce } from '@ember/runloop';
import { getPosition, getCoords } from '@zestia/position-utils';
import { guidFor } from '@ember/object/internals';
import { isPresent } from '@ember/utils';
import { htmlSafe, dasherize } from '@ember/string';
import { inject } from '@ember/service';
import { resolve } from 'rsvp';
import { tracked } from '@glimmer/tracking';
import autoPosition from '../utils/auto-position';

export default class TooltipperComponent extends Component {
  @inject('tooltip') tooltipService;

  @tracked coords = { top: 0, left: 0, position: '' };
  @tracked isLoading = false;
  @tracked isShowingTooltip = false;
  @tracked shouldRenderTooltip = false;

  isLoaded = false;
  isOverReferenceElement = false;
  isOverTooltipElement = false;
  loadedData = null;
  loadEndTime = 0;
  loadError = null;
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

  get shouldAdjust() {
    return isPresent(this.args.adjust) ? this.args.adjust : false;
  }

  get shouldUseMouseEvents() {
    return isPresent(this.args.mouseEvents) ? this.args.mouseEvents : true;
  }

  get hideDelay() {
    return isPresent(this.args.hideDelay) ? this.args.hideDelay : 0;
  }

  get showDelay() {
    return isPresent(this.args.showDelay) ? this.args.showDelay : 0;
  }

  get tooltipComponent() {
    return isPresent(this.args.tooltip) ? this.args.tooltip : 'tooltip';
  }

  get tooltipStyle() {
    return htmlSafe(`top: ${this.coords.top}px; left: ${this.coords.left}px`);
  }

  get tooltipPosition() {
    return dasherize(this.coords.position);
  }

  get loadDelay() {
    return this.loadEndTime - this.loadStartTime;
  }

  get showDelayRemainder() {
    const maxDelay = isPresent(this.args.showDelay) ? this.args.showDelay : 0;
    return this.loadDelay > maxDelay ? 0 : maxDelay - this.loadDelay;
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
      this._scheduleHideTooltipFromHover();
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

    this._scheduleShowTooltipFromHover();
  }

  _mouseLeaveReferenceElement() {
    this.isOverReferenceElement = false;

    this._scheduleHideTooltipFromHover();
  }

  _load() {
    const action =
      this.isLoaded || typeof this.args.onLoad !== 'function'
        ? this._onLoad.bind(this)
        : this.args.onLoad;

    this._loadStarted();

    return resolve(action())
      .then(this._loadedData.bind(this))
      .catch(this._loadError.bind(this))
      .finally(this._loadFinished.bind(this));
  }

  _onLoad() {
    return this.loadedData;
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

  _scheduleShowTooltipFromHover() {
    if (this.isLoading) {
      return;
    }

    this._load().then(this._attemptShowTooltipFromHover.bind(this));
  }

  _attemptShowTooltipFromHover() {
    if (!this.isOverReferenceElement) {
      return;
    }

    this._scheduleShowTooltip();
  }

  _scheduleShowTooltip() {
    this._cancelHideTooltip();

    this.showTimer = debounce(this, '_showTooltip', this.showDelayRemainder);
  }

  _cancelShowTooltip() {
    cancel(this.showTimer);
  }

  _showTooltip() {
    if (this.shouldRenderTooltip) {
      return;
    }

    this._load().then(this._renderTooltip.bind(this));
  }

  _renderTooltip() {
    this.isShowingTooltip = true;
    this.shouldRenderTooltip = true;

    this.tooltipService.add(this);
  }

  _scheduleHideTooltipFromHover() {
    this._cancelShowTooltip();

    this.hideTimer = debounce(
      this,
      '_attemptHideTooltipFromHover',
      this.hideDelay
    );
  }

  _cancelHideTooltip() {
    cancel(this.hideTimer);
  }

  _attemptHideTooltipFromHover() {
    if (this.isOverReferenceElement || this.isOverTooltipElement) {
      return;
    }

    this._hideTooltip();
  }

  _hideTooltip() {
    if (!this.tooltipElement) {
      return;
    }

    return this._waitForTooltipToHide().then(this._destroyTooltip.bind(this));
  }

  _waitForTooltipToHide() {
    return new Promise((resolve) => {
      this.tooltipElement.addEventListener('animationend', resolve, {
        once: true
      });

      this.isShowingTooltip = false;
    });
  }

  _destroyTooltip() {
    this.tooltipService.remove(this);

    this.shouldRenderTooltip = false;
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
    // Get the rough position of the reference element in the window by
    // splitting it in to a grid of rows and columns and choosing a square.

    return getPosition(referenceElement, window, this.columns, this.rows);
  }

  _decideToolipPosition(referencePosition) {
    // The position of the tooltip should be the one provided, or one based
    // upon the position of the reference element, that the tooltip is for.

    return isPresent(this.args.position)
      ? this.args.position
      : autoPosition(referencePosition);
  }

  _recomputeCoords() {
    try {
      // Compute the coordinates required to place the tooltip element near the
      // reference element. And, if a container element is provided, attempt to
      // adjust the position further to make sure the tooltip element it is
      // always visible inside the container.
      this.coords = getCoords(...arguments);
    } catch (error) {
      // The reference element was probably hidden, therefore it's was
      // not possible to compute coordinates.
    }
  }

  _positionTooltip() {
    const { tooltipElement, referenceElement } = this;

    if (!tooltipElement || !referenceElement) {
      return;
    }

    const container = this.shouldAdjust ? window : null;
    const referencePosition = this._getReferencePosition(referenceElement);
    const tooltipPosition = this._decideToolipPosition(referencePosition);

    this._recomputeCoords(
      tooltipPosition,
      tooltipElement,
      referenceElement,
      container
    );
  }
}
