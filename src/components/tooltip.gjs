/* eslint-disable ember/no-runloop, no-unused-vars */

import { cancel, later, next } from '@ember/runloop';
import { defer } from 'rsvp';
import { getPosition, getCoords } from '@zestia/position-utils';
import { guidFor } from '@ember/object/internals';
import { htmlSafe } from '@ember/template';
import { modifier } from 'ember-modifier';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { waitFor } from '@ember/test-waiters';
import { waitForAnimation } from '@zestia/animation-utils';
import autoPosition from '@zestia/ember-async-tooltips/utils/auto-position';
import Component from '@glimmer/component';
const { max } = Math;

export default class TooltipComponent extends Component {
  @service('tooltip') tooltipService;

  @tracked element;
  @tracked isLoading;
  @tracked loadedData = null;
  @tracked loadError = null;
  @tracked shouldRenderTooltip;
  @tracked shouldShowTooltip;
  @tracked tooltipCoords = [0, 0];
  @tracked tooltipElement;

  hideTimer;
  isOverTooltipElement;
  isOverTooltipperElement;
  tooltipperElementIsFocused;
  tooltipperElementWasClicked;
  tooltipElementIsFocused;
  loadDuration = 0;
  showTimer;
  stickyTimer;
  tetherID;
  willInsertTooltip;

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

  get canRenderTooltip() {
    return (
      this.tooltipperElement && this.needsToShowTooltip && !this.childTooltip
    );
  }

  get needsToShowTooltip() {
    if (this.args.show === false) {
      return false;
    }

    if (this.isOverTooltipperElement || this.isOverTooltipElement) {
      return true;
    }

    if (this.args.useClick && this.tooltipperElementWasClicked) {
      return true;
    }

    if (
      this.args.useFocus &&
      (this.tooltipperElementIsFocused || this.tooltipElementIsFocused)
    ) {
      return true;
    }

    return this.args.show;
  }

  get tooltips() {
    return this.tooltipService.tooltips.filter((tooltip) => tooltip !== this);
  }

  get childTooltip() {
    return this.tooltips.find((tooltip) => {
      return this.tooltipperElement?.contains(tooltip.tooltipperElement);
    });
  }

  get parentTooltip() {
    return this.tooltips.find((tooltip) => {
      return tooltip.tooltipperElement?.contains(this.tooltipperElement);
    });
  }

  get stickyTooltips() {
    return this.tooltipService.tooltips.filter((tooltip) => {
      return tooltip.args.stickyID === this.args.stickyID && tooltip.isSticky;
    });
  }

  get shouldLoad() {
    return typeof this.args.onLoad === 'function' && !this.isLoading;
  }

  get shouldLoadEagerly() {
    return this.isEager && this.shouldLoad;
  }

  get shouldLoadLazily() {
    return (!this.isEager && this.shouldLoad) || this.args.show === true;
  }

  get isEager() {
    return this.args.eager ?? true;
  }

  get isSticky() {
    return this.tooltipService._sticky[this.args.stickyID] === true;
  }

  get destinationElement() {
    return this.args.destination
      ? this.#getElement(this.args.destination)
      : this.element.parentElement;
  }

  get positionElement() {
    return this.args.attachTo
      ? this.#getElement(this.args.attachTo)
      : this.tooltipperElement;
  }

  get tooltipperElement() {
    return this.args.element
      ? this.#getElement(this.args.element)
      : this.element.parentElement;
  }

  get referencePosition() {
    return getPosition(this.positionElement, window, this.columns, this.rows);
  }

  get tooltipPosition() {
    const { position } = this.args;

    if (typeof position === 'string') {
      return position;
    }

    if (typeof position === 'function') {
      return position(this.referencePosition);
    }

    return autoPosition(this.referencePosition);
  }

  handleMouseEnterTooltipperElement = () => {
    this.isOverTooltipperElement = true;
    this.#prepareToShowTooltip();
  };

  handleMouseLeaveTooltipperElement = () => {
    this.isOverTooltipperElement = false;
    this.tooltipperElementIsFocused = false;
    this.#scheduleHideTooltip();
  };

  handleClickTooltipperElement = (event) => {
    event.stopPropagation();
    this.tooltipService.hideAllTooltips();
    this.tooltipperElementWasClicked = true;
    this.#prepareToShowTooltip();
  };

  handleClickDocument = () => {
    this.tooltipperElementWasClicked = false;
    this.#scheduleHideTooltip();
  };

  handleMouseEnterTooltip = () => {
    this.isOverTooltipElement = true;
  };

  handleMouseLeaveTooltip = () => {
    this.isOverTooltipElement = false;
    this.#scheduleHideTooltip();
  };

  handleFocusTooltipperElement = (event) => {
    this.tooltipperElementIsFocused =
      !this.tooltipperElement.dataset.programmaticallyFocused;
    this.#prepareToShowTooltip();
  };

  handleBlurTooltipperElement = () => {
    this.tooltipperElementIsFocused = false;
    this.#scheduleHideTooltip();
  };

  handleFocusTooltipElement = () => {
    this.tooltipElementIsFocused = true;
  };

  handleBlurTooltipElement = () => {
    this.tooltipElementIsFocused = false;
    this.#scheduleHideTooltip();
  };

  hide = () => {
    return this.#hideTooltip();
  };

  show = () => {
    this.#showTooltip();
  };

  async #load() {
    const start = Date.now();

    try {
      this.isLoading = true;
      this.loadDuration = 0;
      this.loadedData = await this.args.onLoad?.();
    } catch (error) {
      this.loadError = error;
    } finally {
      const end = Date.now();
      this.loadDuration = end - start;
      this.isLoading = false;
    }
  }

  #scheduleShowTooltip() {
    this.#cancelTimers();
    this.showTimer = later(this, '_attemptShowTooltip', this.actualShowDelay);
  }

  _attemptShowTooltip() {
    if (!this.canRenderTooltip) {
      return;
    }

    if (this.parentTooltip) {
      this.parentTooltip.hide();
    }

    this.#showTooltip();
  }

  async #prepareToShowTooltip() {
    this.loadDuration = 0;

    if (this.shouldLoadEagerly) {
      await this.#load();
    }

    this.#scheduleShowTooltip();
  }

  async #showTooltip() {
    this.shouldShowTooltip = true;

    if (this.shouldRenderTooltip) {
      return;
    }

    if (this.shouldLoadLazily) {
      this.#load();
    }

    await this.#renderTooltip();
    await this._waitForAnimation();

    this.#handleShow();
  }

  #renderTooltip() {
    this.willInsertTooltip = defer();
    this.shouldRenderTooltip = true;

    return this.willInsertTooltip.promise;
  }

  #scheduleHideTooltip() {
    this.#cancelTimers();

    this.hideTimer = later(this, '_attemptHideTooltip', this.hideDelay);
  }

  _attemptHideTooltip() {
    if (this.needsToShowTooltip) {
      return;
    }

    this.#hideTooltip();
  }

  async #hideTooltip() {
    if (!this.tooltipElement) {
      return;
    }

    this.shouldShowTooltip = false;

    await this._waitForAnimation();

    this.#handleHide();
  }

  #cancelTimers() {
    cancel(this.showTimer);
    cancel(this.hideTimer);
    cancel(this.stickyTimer);
  }

  #scheduleResetSticky() {
    this.stickyTimer = later(this, '_attemptResetSticky', this.stickyTimeout);
  }

  _attemptResetSticky() {
    if (this.stickyTooltips.length) {
      return;
    }

    this.tooltipService._setSticky(this, false);
  }

  #handleShow() {
    if (this.args.stickyID) {
      this.tooltipService._setSticky(this, true);
    }

    this.args.onShow?.();
  }

  #handleHide() {
    if (this.args.stickyID) {
      this.#scheduleResetSticky();
    }

    this.#attemptDestroyTooltip();

    this.args.onHide?.();
  }

  @waitFor
  async _waitForAnimation() {
    await waitForAnimation(this.tooltipElement, { maybe: true });
  }

  #attemptDestroyTooltip() {
    if (this.shouldShowTooltip) {
      return;
    }

    this.#destroyTooltip();
  }

  #destroyTooltip() {
    this.shouldRenderTooltip = false;
  }

  #getElement(element) {
    try {
      if (typeof element === 'string') {
        return document.querySelector(element);
      }

      if (element instanceof HTMLElement) {
        return element;
      }
    } catch {
      /* squelch */
    }
  }

  #tether() {
    if (!this.positionElement) {
      return;
    }

    this.tooltipCoords = getCoords(
      this.tooltipPosition,
      this.tooltipElement,
      this.positionElement
    );

    this.tetherID = requestAnimationFrame(this.#tether.bind(this));
  }

  #startTether() {
    requestAnimationFrame(this.#tether.bind(this));
  }

  #stopTether() {
    cancelAnimationFrame(this.tetherID);
  }

  #add(element, ...args) {
    element.addEventListener(...args);
  }

  #rem(element, ...args) {
    element.removeEventListener(...args);
  }

  get #api() {
    return {
      isLoading: this.isLoading,
      data: this.loadedData,
      error: this.loadError,
      hide: this.hide
    };
  }

  api = new Proxy(this, {
    get(target, key) {
      return target.#api[key];
    },
    set() {}
  });

  visibility = modifier((_, [show]) => {
    next(() => {
      if (show === true) {
        this.#showTooltip();
      } else if (show === false) {
        this.#hideTooltip();
      }
    });
  });

  position = modifier((_, [position, columns, rows, destination, attachTo]) => {
    this.#startTether();
    return () => this.#stopTether();
  });

  tooltipperEvents = modifier((element, [otherElement]) => {
    this.element = element;
    const doc = document;
    const { tooltipperElement: el } = this;

    if (el) {
      if (this.args.useClick) {
        this.#add(el, 'click', this.handleClickTooltipperElement);
        this.#add(doc, 'click', this.handleClickDocument);
      } else {
        this.#add(el, 'mouseenter', this.handleMouseEnterTooltipperElement);
        this.#add(el, 'mouseleave', this.handleMouseLeaveTooltipperElement);
      }

      if (this.args.useFocus) {
        this.#add(el, 'focus', this.handleFocusTooltipperElement);
        this.#add(el, 'blur', this.handleBlurTooltipperElement);
      }
    }

    return () => {
      if (el) {
        if (this.args.useClick) {
          this.#rem(el, 'click', this.handleClickTooltipperElement);
          this.#rem(doc, 'click', this.handleClickDocument);
        } else {
          this.#rem(el, 'mouseenter', this.handleMouseEnterTooltipperElement);
          this.#rem(el, 'mouseleave', this.handleMouseLeaveTooltipperElement);
        }

        if (this.args.useFocus) {
          this.#rem(el, 'focus', this.handleFocusTooltipperElement);
          this.#rem(el, 'blur', this.handleBlurTooltipperElement);
        }
      }
    };
  });

  tooltipEvents = modifier((element) => {
    this.#add(element, 'mouseenter', this.handleMouseEnterTooltip);
    this.#add(element, 'mouseleave', this.handleMouseLeaveTooltip);

    if (this.args.useFocus) {
      this.#add(element, 'focusin', this.handleFocusTooltipElement);
      this.#add(element, 'focusout', this.handleBlurTooltipElement);
    }

    return () => {
      this.#rem(element, 'mouseenter', this.handleMouseEnterTooltip);
      this.#rem(element, 'mouseleave', this.handleMouseLeaveTooltip);

      if (this.args.useFocus) {
        this.#rem(element, 'focusin', this.handleFocusTooltipElement);
        this.#rem(element, 'focusout', this.handleBlurTooltipElement);
      }
    };
  });

  className = modifier(() => {
    this.tooltipperElement?.classList.add('tooltipper');
    return () => this.tooltipperElement?.classList.remove('tooltipper');
  });

  loading = modifier((_, [isLoading]) => {
    if (this.isLoading && this.tooltipperElement) {
      this.tooltipperElement.dataset.loading = 'true';
    } else {
      delete this.tooltipperElement?.dataset.loading;
    }
  });

  aria = modifier(() => {
    this.tooltipperElement?.setAttribute('aria-describedby', this.id);
    return () => this.tooltipperElement?.removeAttribute('aria-describedby');
  });

  register = modifier((element) => {
    this.tooltipElement = element;
    this.willInsertTooltip.resolve();
    this.tooltipService._add(this);

    return () => {
      this.#cancelTimers();
      this.tooltipService._remove(this);
    };
  });

  <template>
    {{~""~}}
    <span
      class="__tooltip__"
      hidden
      {{this.tooltipperEvents @element}}
      {{this.className}}
      {{this.visibility @show}}
      {{this.loading this.isLoading}}
    ></span>
    {{~#if this.shouldRenderTooltip~}}
      {{~#in-element this.destinationElement insertBefore=null~}}
        <div
          class="tooltip"
          data-showing="{{this.shouldShowTooltip}}"
          data-position={{this.tooltipPosition}}
          data-sticky="{{this.isSticky}}"
          id={{this.id}}
          style={{this.tooltipStyle}}
          role="tooltip"
          aria-live="polite"
          {{this.tooltipEvents}}
          {{this.register}}
          {{this.aria}}
          {{this.position @position @columns @rows @destination @attachTo}}
          ...attributes
        >
          {{~yield this.api~}}
        </div>
      {{~/in-element~}}
    {{/if}}
    {{~""~}}
  </template>
}
