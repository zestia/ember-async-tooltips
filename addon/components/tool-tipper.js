/* eslint-disable ember/no-get */
import { trySet, set, get } from '@ember/object';
import { resolve } from 'rsvp';
import Component from '@ember/component';
import layout from '../templates/components/tool-tipper';
import { inject } from '@ember/service';
import { debounce, bind } from '@ember/runloop';

export default Component.extend({
  tooltipService: inject('tooltip'),

  layout,

  classNames: ['tooltipper'],
  classNameBindings: ['tooltipInstance:has-tooltip', 'isLoading'],
  attributeBindings: ['tabindex', 'href', 'target', 'rel', 'type', 'draggable'],

  mouseEvents: true,
  showDelay: 0,
  hideDelay: 0,

  tooltipInstance: null,

  onLoad() {},

  didInsertElement() {
    this._super(...arguments);

    if (!this.referenceElement) {
      set(this, 'referenceElement', this.element);
    }

    if (this.mouseEvents) {
      this._listen();
    }
  },

  willDestroyElement() {
    this._super(...arguments);

    if (this.mouseEvents) {
      this._stopListening();
    }

    this._destroyTooltip();
  },

  actions: {
    tooltipInserted(tooltip) {
      set(this, 'tooltipInstance', tooltip);
    },

    tooltipExited() {
      if (this.mouseEvents) {
        this._scheduleHideTooltipFromHover();
      }
    },

    tooltipHidden() {
      this._destroyTooltip();
      set(this, 'tooltipInstance', null);
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

  _listen() {
    set(this, '_mouseEnterHandler', bind(this, '_mouseEnter'));
    set(this, '_mouseLeaveHandler', bind(this, '_mouseLeave'));
    this.referenceElement.addEventListener('mouseenter', this._mouseEnterHandler);
    this.referenceElement.addEventListener('mouseleave', this._mouseLeaveHandler);
  },

  _stopListening() {
    this.referenceElement.removeEventListener('mouseenter', this._mouseEnterHandler);
    this.referenceElement.removeEventListener('mouseleave', this._mouseLeaveHandler);
  },

  _mouseEnter() {
    set(this, 'isOver', true);
    this._loadWithDelay().then(delay => {
      this._scheduleShowTooltipFromHover(delay);
    });
  },

  _mouseLeave() {
    this._super(...arguments);
    set(this, 'isOver', false);
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
        .finally(() => {
          trySet(this, 'isLoading', false);
        });
    }
  },

  _loadWithDelay() {
    const start = Date.now();
    return this._load().then(() => {
      const end = Date.now();
      const wait = end - start;
      const max = this.showDelay;
      const delay = wait > max ? 0 : max - wait;
      return delay;
    });
  },

  _scheduleShowTooltipFromHover(delay) {
    debounce(this, '_attemptShowTooltipFromHover', delay);
  },

  _scheduleHideTooltipFromHover() {
    debounce(this, '_attemptHideTooltipFromHover', this.hideDelay);
  },

  _attemptShowTooltipFromHover() {
    if (this.isOver) {
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
    get(this, 'tooltipService').activate(this);
  },

  _destroyTooltip() {
    get(this, 'tooltipService').deactivate(this);
  }
});
