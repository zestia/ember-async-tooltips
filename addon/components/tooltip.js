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
const { seal, assign } = Object;
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

  _api = {};
  hideTimer = null;
  isLoaded = false;
  isOverTooltipElement = false;
  isOverTooltipperElement = false;
  loadDuration = 0;
  showTimer = null;
  stickyTimer = null;
  tetherID = null;
  willInsertTooltip = null;

  get api() {
    return seal(
      assign(this._api, {
        data: this.loadedData,
        error: this.loadError,
        hide: this.hide
      })
    );
  }

  get hasTooltip() {
    return !!this.tooltipElement;
  }

  get canRenderTooltip() {
    return (
      this.tooltipperElement.isConnected &&
      this.needsToShowTooltip &&
      !this.isDestroyed &&
      !this.childTooltip
    );
  }

  get id() {
    return guidFor(this);
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
    this._updateAria();
    this._updateVisibility();
    this._updatePosition();
    this.willInsertTooltip.resolve();
    this.tooltipService._add(this);
  }

  @action
  handleDestroyTooltip() {
    this.tooltipElement = null;
    this.isOverTooltipElement = false;
    this._updateAria();
    this.tooltipService._remove(this);
  }

  @action
  handleDestroyElement() {
    this._stopTether();
    this._cancelTimers();
    this._tearDownTooltipper();
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

  _updateVisibility() {
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
    this._updateLoading();

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
      this._updateLoading();
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

    this._startTether();

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
    await waitForAnimation(this.tooltipElement, { maybe: true });
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

  _update() {
    if (this.tooltipperElement) {
      this._tearDownTooltipper();
    }

    this._updateElements();
    this._setUpTooltipper();
    this._updateVisibility();
    this._updatePosition();
  }

  _updateElements() {
    this.tooltipperElement =
      this._getElement(this.args.element) ?? this.element.parentElement;

    this.destinationElement =
      this._getElement(this.args.destination) ?? this.element.parentElement;

    this.positionElement =
      this._getElement(this.args.attachTo) ?? this.tooltipperElement;
  }

  _updatePosition() {
    if (!this.hasTooltip) {
      return;
    }

    this.tooltipPosition = this._decideTooltipPosition();
    this.tooltipCoords = this._computeTooltipCoords();
  }

  _updateAria() {
    if (this.hasTooltip) {
      this.tooltipperElement.setAttribute('aria-describedby', this.id);
    } else {
      this.tooltipperElement.removeAttribute('aria-describedby');
    }
  }

  _updateLoading() {
    if (this.isLoading) {
      this.tooltipperElement.dataset.loading = 'true';
    } else {
      delete this.tooltipperElement.dataset.loading;
    }
  }

  _tearDownTooltipper() {
    this._remove('mouseenter', this.handleMouseEnterTooltipperElement);
    this._remove('mouseleave', this.handleMouseLeaveTooltipperElement);

    this.tooltipperElement.removeAttribute('aria-describedby');
    this.tooltipperElement.classList.remove('tooltipper');
    delete this.tooltipperElement.dataset.tooltipLoading;
  }

  _setUpTooltipper() {
    this._add('mouseenter', this.handleMouseEnterTooltipperElement);
    this._add('mouseleave', this.handleMouseLeaveTooltipperElement);

    this.tooltipperElement.classList.add('tooltipper');
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
    this._updatePosition();
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
}
