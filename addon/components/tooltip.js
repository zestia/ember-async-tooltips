import Component from '@glimmer/component';
import { cancel, later, next } from '@ember/runloop';
import { getPosition, getCoords } from '@zestia/position-utils';
import { guidFor } from '@ember/object/internals';
import { htmlSafe } from '@ember/template';
import { inject } from '@ember/service';
import { defer } from 'rsvp';
import { tracked } from '@glimmer/tracking';
import { waitFor } from '@ember/test-waiters';
import { waitForAnimation } from '@zestia/animation-utils';
import autoPosition from '../utils/auto-position';
import { action } from '@ember/object';
const { max } = Math;

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
  @tracked destinationElement = null;
  @tracked tooltipperElement = null;
  @tracked positionElement = null;

  hideTimer = null;
  isLoaded = false;
  isOverTooltipElement = false;
  isOverTooltipperElement = false;
  loadDuration = 0;
  showTimer = null;
  stickyTimer = null;
  tetherID = null;
  willInsertTooltip = null;

  get hasTooltip() {
    return !!this.tooltipElement;
  }

  get canRenderTooltip() {
    return !this.isDestroyed && this.needsToShowTooltip && !this.childTooltip;
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

  get hideDelay() {
    return this.args.hideDelay ?? 0;
  }

  get showDelay() {
    return this.args.showDelay ?? 0;
  }

  get actualShowDelay() {
    if (this.isSticky) {
      return 0;
    }

    if (this.isEager) {
      return max(this.showDelay - this.loadDuration, 0);
    }

    return this.showDelay;
  }

  get stickyTimeout() {
    return this.args.stickyTimeout ?? this.showDelay / 2;
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

  get shouldLoad() {
    return (
      typeof this.args.onLoad === 'function' &&
      !(this.isLoading || this.isLoaded)
    );
  }

  get shouldLoadEagerly() {
    return this.isEager && this.shouldLoad;
  }

  get isEager() {
    return this.args.eager ?? true;
  }

  get isSticky() {
    return this.tooltipService._sticky[this.args.stickyID] === true;
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
    this.tooltipService._add(this);
    this._updateTooltipper();
    this._handleManualToggling();
    this._positionTooltip();
    this.willInsertTooltip.resolve();
  }

  @action
  handleDestroyTooltip() {
    this.tooltipElement = null;
    this.isOverTooltipElement = false;
    this.shouldRenderTooltip = false;
    this._updateTooltipper();
    this.tooltipService._remove(this);
  }

  @action
  handleDestroyElement() {
    this._cancelTimers();
    this._tearDown();
  }

  @action
  async handleMouseEnterTooltipperElement() {
    this.isOverTooltipperElement = true;

    if (this.shouldLoadEagerly) {
      await this._load();
    }

    this._scheduleShowTooltip();

    this.loadDuration = 0;
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

  async _load() {
    const start = Date.now();
    this.isLoading = true;
    this._updateTooltipper();

    try {
      this.loadedData = await this.args.onLoad?.();
      this.isLoaded = true;
    } catch (error) {
      this.loadError = error;
      this.isLoaded = false;
    } finally {
      const end = Date.now();
      this.loadDuration = end - start;
      this.isLoading = false;
      this._updateTooltipper();
    }
  }

  _scheduleShowTooltip() {
    this._cancelTimers();

    this.showTimer = later(this, '_attemptShowTooltip', this.actualShowDelay);
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

  async _showTooltip() {
    this.shouldShowTooltip = true;

    if (this.shouldRenderTooltip) {
      return;
    }

    if (this.shouldLoad) {
      this._load();
    }

    await this._renderTooltip();
    await this._waitForAnimation();

    this._handleShow();
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

  async _hideTooltip() {
    if (!this.tooltipElement) {
      return;
    }

    this.shouldShowTooltip = false;

    await this._waitForAnimation();

    this._handleHide();
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

    this.tooltipService._setSticky(this, false);
  }

  _handleShow() {
    if (this.args.stickyID) {
      this.tooltipService._setSticky(this, true);
    }

    this._startTether();

    this.args.onShow?.();
  }

  _handleHide() {
    if (this.args.stickyID) {
      this._scheduleResetSticky();
    }

    this._stopTether();
    this._attemptDestroyTooltip();

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
    this._computeElements();
    this.tooltipperElement.classList.add('tooltipper');

    this._add('mouseenter', this.handleMouseEnterTooltipperElement);
    this._add('mouseleave', this.handleMouseLeaveTooltipperElement);
  }

  _computeElements() {
    this.tooltipperElement =
      this._getElement(this.args.element) ?? this.element.parentElement;

    this.destinationElement =
      this._getElement(this.args.destination) ?? this.element.parentElement;

    this.positionElement =
      this._getElement(this.args.attachTo) ?? this.tooltipperElement;
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

  _getElement(element) {
    if (typeof element === 'string') {
      return document.querySelector(element);
    }

    if (element instanceof HTMLElement) {
      return element;
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

  _getReferencePosition() {
    return getPosition(this.positionElement, window, this.columns, this.rows);
  }

  _computeTooltipCoords() {
    return getCoords(
      this.tooltipPosition,
      this.tooltipElement,
      this.positionElement
    );
  }

  _decideTooltipPosition() {
    const { position } = this.args;

    if (typeof position === 'string') {
      return position;
    }

    const referencePosition = this._getReferencePosition();

    if (typeof position === 'function') {
      return position(referencePosition);
    }

    return autoPosition(referencePosition);
  }

  _positionTooltip() {
    if (!this.hasTooltip) {
      return;
    }

    this.tooltipPosition = this._decideTooltipPosition();
    this.tooltipCoords = this._computeTooltipCoords();
  }
}
