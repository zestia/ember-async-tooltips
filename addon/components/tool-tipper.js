/* eslint-disable */
import { computed, trySet } from '@ember/object';
import { bool } from '@ember/object/computed';
/* eslint-enable */
import { resolve } from 'rsvp';
import Component from '@ember/component';
import layout from '../templates/components/tool-tipper';
import { inject } from '@ember/service';
import { debounce, bind } from '@ember/runloop';

export default Component.extend({
  tooltipService: inject('tooltip'),

  layout,

  tagName: 'span',
  classNames: ['tooltipper'],
  classNameBindings: ['hasTooltip', 'isLoading'],
  attributeBindings: ['tabindex', 'href', 'target', 'rel', 'typeAttr:type', 'draggable'],

  mouseEvents: true,
  showDelay: 0,
  hideDelay: 0,

  tooltipInstance: null,

  onLoad() {},

  hasTooltip: bool('tooltipInstance'),

  typeAttr: computed(function() {
    if (this.tagName === 'button') {
      return this.type || 'button';
    }
  }),

  didInsertElement() {
    this._super(...arguments);

    if (!this.referenceElement) {
      this.set('referenceElement', this.element);
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
      this.set('tooltipInstance', tooltip);
    },

    tooltipExited() {
      if (this.mouseEvents) {
        this._scheduleHideTooltipFromHover();
      }
    },

    tooltipHidden() {
      this._destroyTooltip();
      this.set('tooltipInstance', null);
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
    this.set('_mouseEnterHandler', bind(this, '_mouseEnter'));
    this.set('_mouseLeaveHandler', bind(this, '_mouseLeave'));
    this.referenceElement.addEventListener('mouseenter', this._mouseEnterHandler);
    this.referenceElement.addEventListener('mouseleave', this._mouseLeaveHandler);
  },

  _stopListening() {
    this.referenceElement.removeEventListener('mouseenter', this._mouseEnterHandler);
    this.referenceElement.removeEventListener('mouseleave', this._mouseLeaveHandler);
  },

  _mouseEnter() {
    this.set('isOver', true);
    this._loadWithDelay().then(delay => {
      this._scheduleShowTooltipFromHover(delay);
    });
  },

  _mouseLeave() {
    this._super(...arguments);
    this.set('isOver', false);
    this._scheduleHideTooltipFromHover();
  },

  _load() {
    if (this.isLoaded) {
      return resolve();
    } else {
      this.set('isLoading', true);
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
    this.get('tooltipService').activate(this);
  },

  _destroyTooltip() {
    this.get('tooltipService').deactivate(this);
  }
});
