import { computed, trySet, set } from '@ember/object';
import { resolve } from 'rsvp';
import Component from '@ember/component';
import layout from '../templates/components/tooltipper';
import { debounce } from '@ember/runloop';

export default Component.extend({
  layout,
  tagName: '',

  // Arguments

  mouseEvents: true,
  referenceElement: null,
  showDelay: 0,
  hideDelay: 0,

  // State

  tooltipInstance: null,
  domElement: null,

  // Actions

  onLoad() {},

  computedReferenceElement: computed(function() {
    return this.referenceElement || this.domElement;
  }),

  actions: {
    didInsertElement(element) {
      set(this, 'domElement', element);

      this._setupReferenceElement();
    },

    willDestroyElement() {
      this._teardownReferenceElement();
    },

    onInitTooltip(tooltip) {
      this._registerTooltip(tooltip);
    },

    onDestroyTooltip() {
      this._deregisterTooltip();
    },

    onMouseEnterTooltip() {
      set(this, 'isOverTooltip', true);
    },

    onMouseLeaveTooltip() {
      set(this, 'isOverTooltip', false);

      this._scheduleHideTooltipFromHover();
    },

    onHideTooltip() {
      this._destroyTooltip();
    },

    hideTooltip() {
      this._attemptHideTooltip();
    },

    showTooltip() {
      this._attemptShowTooltip();
    },

    toggleTooltip() {
      if (this.tooltipInstance) {
        this.send('hideTooltip');
      } else {
        this.send('showTooltip');
      }
    }
  },

  _startListening(element) {
    this._mouseEnterHandler = this._mouseEnterReferenceElement.bind(this);
    this._mouseLeaveHandler = this._mouseLeaveReferenceElement.bind(this);

    element.addEventListener('mouseenter', this._mouseEnterHandler);
    element.addEventListener('mouseleave', this._mouseLeaveHandler);
  },

  _stopListening(element) {
    element.removeEventListener('mouseenter', this._mouseEnterHandler);
    element.removeEventListener('mouseleave', this._mouseLeaveHandler);
  },

  _mouseEnterReferenceElement() {
    set(this, 'isOverReferenceElement', true);

    this._loadWithDelay(this.showDelay).then(remainingDelay => {
      this._scheduleShowTooltipFromHover(remainingDelay);
    });
  },

  _mouseLeaveReferenceElement() {
    set(this, 'isOverReferenceElement', false);

    this._scheduleHideTooltipFromHover();
  },

  _load() {
    if (this.isLoaded) {
      return resolve();
    } else {
      set(this, 'isLoading', true);
      return resolve(this.onLoad())
        .then(data => {
          trySet(this, 'data', data);
          trySet(this, 'isLoaded', true);
        })
        .catch(error => {
          trySet(this, 'error', error);
        })
        .finally(() => {
          trySet(this, 'isLoading', false);
        });
    }
  },

  _loadWithDelay(delay) {
    const start = Date.now();
    return this._load().then(() => {
      const end = Date.now();
      const wait = end - start;
      const remainder = wait > delay ? 0 : delay - wait;
      return remainder;
    });
  },

  _scheduleShowTooltipFromHover(delay) {
    debounce(this, '_attemptShowTooltipFromHover', delay);
  },

  _scheduleHideTooltipFromHover() {
    debounce(this, '_attemptHideTooltipFromHover', this.hideDelay);
  },

  _attemptShowTooltipFromHover() {
    if (this.isOverTooltipper) {
      this._attemptShowTooltip();
    }
  },

  _attemptHideTooltipFromHover() {
    if (this.tooltipInstance && !this.tooltipInstance.isOver && !this.isOver) {
      this._attemptHideTooltip();
    }
  },

  _attemptShowTooltip() {
    if (!this.isDestroyed && !this.tooltipInstance) {
      this._renderTooltip();
    }
  },

  _attemptHideTooltip() {
    if (!this.isDestroyed && this.tooltipInstance) {
      this.tooltipInstance.send('hide');
    }
  },

  _renderTooltip() {
    set(this, 'renderTooltip', true);
  },

  _destroyTooltip() {
    set(this, 'renderTooltip', false);
  },

  _registerTooltip(tooltip) {
    set(this, 'tooltipInstance', tooltip);
  },

  _deregisterTooltip() {
    set(this, 'tooltipInstance', null);
  },

  _setupReferenceElement() {
    if (this.mouseEvents) {
      this._startListening(this.computedReferenceElement);
    }
  },

  _teardownReferenceElement() {
    if (this.mouseEvents) {
      this._stopListening(this.computedReferenceElement);
    }
  }
});
