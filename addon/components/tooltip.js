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

export default class TooltipComponent extends Component {
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
  isOverTooltipElement = false;
  isOverTooltipperElement = false;
  loadEndTime = 0;
  loadStartTime = 0;
  showTimer = null;
  stickyTimer = null;
  tooltipperElement = null;
  positionElement = null;
  willInsertTooltip = null;

  get hasTooltip() {
    return !!this.tooltipElement;
  }

  get canRenderTooltip() {
    return this.needsToShowTooltip && !this.childTooltip;
  }

  get id() {
    return guidFor(this).replace('ember', '');
  }

  get tooltipId() {
    return `tooltip-${this.id}`;
  }

  get columns() {
    return this.args.columns ?? 3;
  }

  get rows() {
    return this.args.rows ?? 3;
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
    return (
      this.isOverTooltipperElement ||
      this.isOverTooltipElement ||
      this.args.show
    );
  }

  get tooltips() {
    return this.tooltipService.tooltips.filter((tooltip) => tooltip !== this);
  }

  get childTooltip() {
    return this.tooltips.find((tooltip) => {
      return this.tooltipperElement.contains(tooltip.tooltipperElement);
    });
  }

  get parentTooltip() {
    return this.tooltips.find((tooltip) => {
      return tooltip.tooltipperElement.contains(this.tooltipperElement);
    });
  }

  get stickyTooltips() {
    return this.tooltipService.tooltips.filter((tooltip) => {
      return tooltip.args.stickyID === this.args.stickyID && tooltip.isSticky;
    });
  }

  get isSticky() {
    return this.tooltipService.sticky[this.args.stickyID] === true;
  }

  get api() {
    return {
      data: this.loadedData,
      error: this.loadError,
      hide: this.hide
    };
  }

  @action
  handleInsertElement(element) {
    this.element = element;
    this._update();
  }

  @action
  handleUpdatedArguments() {
    this._update();
  }

  @action
  handleInsertTooltip(element) {
    this.tooltipElement = element;
    this.tooltipService.add(this);
    this._update();
    this.willInsertTooltip.resolve();
  }

  @action
  handleDestroyTooltip() {
    this.tooltipElement = null;
    this.isOverTooltipElement = false;
    this.shouldRenderTooltip = false;
    this._updateTooltipper();
    this.tooltipService.remove(this);
  }

  @action
  handleDestroyElement() {
    this._cancelTimers();
    this._tearDown();
  }

  @action
  handleMouseEnterTooltipperElement() {
    this.isOverTooltipperElement = true;

    this._loadOnce().then(() => this._scheduleShowTooltip());
  }

  @action
  handleMouseLeaveTooltipperElement() {
    this.isOverTooltipperElement = false;

    this._scheduleHideTooltip();
  }

  @action
  handleMouseEnterTooltip() {
    this.isOverTooltipElement = true;
  }

  @action
  handleMouseLeaveTooltip() {
    this.isOverTooltipElement = false;

    this._scheduleHideTooltip();
  }

  @action
  hide() {
    return this._hideTooltip();
  }

  @action
  show() {
    this._showTooltip();
  }

  @action
  reposition() {
    this._positionTooltip();
  }

  _handleManualToggling() {
    next(() => this._maybeToggleViaArg());
  }

  _maybeToggleViaArg() {
    if (this.args.show === true) {
      this._showTooltip();
    } else if (this.args.show === false) {
      this._hideTooltip();
    }
  }

  _stopListening() {}

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
    this._update();
  }

  _loadFinished() {
    this.loadEndTime = Date.now();
    this.isLoading = false;
    this._update();
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

    if (this.parentTooltip) {
      this.parentTooltip.hide();
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
    if (this.stickyTooltips.length) {
      return;
    }

    this.tooltipService.setSticky(this, false);
  }

  _handleShow() {
    if (this.args.stickyID) {
      this.tooltipService.setSticky(this, true);
    }

    this._startTether();

    this.args.onShow?.();
  }

  _handleHide() {
    if (this.args.stickyID) {
      this._scheduleResetSticky();
    }

    this._stopTether();

    this.args.onHide?.();
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
  }

  _setUp() {
    this.tooltipperElement = this._getTooltipperElement();
    this.positionElement = this._getPositionElement();
    this.tooltipperElement.classList.add('tooltipper');

    this._add('mouseenter', this.handleMouseEnterTooltipperElement);
    this._add('mouseleave', this.handleMouseLeaveTooltipperElement);
  }

  _update() {
    if (this.tooltipperElement) {
      this._tearDown();
    }

    this._setUp();
    this._updateTooltipper();
    this._handleManualToggling();
    this._positionTooltip();
  }

  _updateTooltipper() {
    if (this.hasTooltip) {
      this.tooltipperElement.setAttribute('aria-describedby', this.tooltipId);
    } else {
      this.tooltipperElement.removeAttribute('aria-describedby');
    }

    if (this.isLoading) {
      this.tooltipperElement.dataset.tooltipLoading = 'true';
    } else {
      delete this.tooltipperElement.dataset.tooltipLoading;
    }
  }

  _tearDown() {
    this.tooltipperElement.classList.remove('tooltipper');

    this._remove('mouseenter', this.handleMouseEnterTooltipperElement);
    this._remove('mouseleave', this.handleMouseLeaveTooltipperElement);
  }

  _add(...args) {
    this.tooltipperElement.addEventListener(...args);
  }

  _remove(...args) {
    this.tooltipperElement.removeEventListener(...args);
  }

  _getTooltipperElement() {
    return this._getElement(this.args.element) ?? this.element.parentElement;
  }

  _getPositionElement() {
    return this._getElement(this.args.attachTo) ?? this.tooltipperElement;
  }

  _getElement(element) {
    if (typeof element === 'string') {
      return document.querySelector(element);
    } else if (element instanceof HTMLElement) {
      return this.args.element;
    }
  }

  _tether() {
    this._positionTooltip();
    this.tetherID = requestAnimationFrame(this._tether.bind(this));
  }

  _startTether() {
    requestAnimationFrame(this._tether.bind(this));
  }

  _stopTether() {
    cancelAnimationFrame(this.tetherID);
  }

  _getTooltipperPosition() {
    // Get the rough position of the tooltipper element in the viewport by
    // splitting it in to a grid of rows and columns and choosing a square.

    return getPosition(this.positionElement, window, this.columns, this.rows);
  }

  _computeCoords(position) {
    // Compute the coordinates required to place the tooltip element at the
    // given position near the tooltipper, or the specified attach-to element.

    return getCoords(position, this.tooltipElement, this.positionElement);
  }

  _decideTooltipPosition(tooltipperPosition) {
    // The position of the tooltip should be the one provided, or one chosen
    // automatically, based upon the position of the tooltipper element.

    const { position } = this.args;

    if (typeof position === 'string') {
      return position;
    } else if (typeof position === 'function') {
      return position(tooltipperPosition);
    } else {
      return autoPosition(tooltipperPosition);
    }
  }

  _positionTooltip() {
    if (!this.tooltipElement || !this.positionElement) {
      return;
    }

    const tooltipperPosition = this._getTooltipperPosition();

    const tooltipPosition = this._decideTooltipPosition(tooltipperPosition);

    this.tooltipCoords = this._computeCoords(tooltipPosition);

    this.tooltipPosition = tooltipPosition;
  }
}