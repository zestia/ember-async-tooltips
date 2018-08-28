/* eslint-disable */
import { computed, trySet } from '@ember/object';
import { bool } from '@ember/object/computed';
/* eslint-enable */
import { resolve } from 'rsvp';
import Component from '@ember/component';
import layout from '../templates/components/tool-tipper';
import { inject } from '@ember/service';
import { debounce } from '@ember/runloop';

export default Component.extend({
  tooltipService: inject('tooltip'),

  layout,
  tagName: 'span',

  classNames: ['tooltipper'],

  classNameBindings: [
    'hasTooltip',
    'isLoading'
  ],

  attributeBindings: [
    'tabindex',
    'href',
    'target',
    'rel',
    'typeAttr:type',
    'draggable'
  ],

  hoverDelayIn: 0,
  hoverDelayOut: 0,

  onLoad() {},

  hasTooltip: bool('_tooltip'),

  typeAttr: computed(function() {
    if (this.tagName === 'button') {
      return this.type || 'button';
    }
  }),

  willDestroyElement() {
    this._super(...arguments);
    this._destroyTooltip();
  },

  actions: {
    tooltipInserted(tooltip) {
      this.set('_tooltip', tooltip);
    },

    tooltipExited() {
      this._scheduleHideTooltipFromHover();
    },

    tooltipHidden() {
      this._destroyTooltip();
      this.set('_tooltip', null);
    },

    hideTooltip() {
      this._attemptHideTooltip();
    },

    showTooltip() {
      this._attemptShowTooltip();
    }
  },

  mouseEnter() {
    this._super(...arguments);
    this.set('isOver', true);
    this._loadWithDelay().then(delay => {
      this._scheduleShowTooltipFromHover(delay);
    });
  },

  mouseLeave() {
    this._super(...arguments);
    this.set('isOver', false);
    this._scheduleHideTooltipFromHover();
  },

  _load() {
    if (this.isLoaded) {
      return resolve();
    } else {
      this.set('isLoading', true);
      return resolve(this.onLoad()).then(data => {
        trySet(this, 'data', data);
        trySet(this, 'isLoaded', true);
      }).finally(() => {
        trySet(this, 'isLoading', false);
      });
    }
  },

  _loadWithDelay() {
    const start = Date.now();
    return this._load().then(() => {
      const end   = Date.now();
      const wait  = end - start;
      const max   = this.hoverDelayIn;
      const delay = wait > max ? 0 : max - wait;
      return delay;
    });
  },

  _scheduleShowTooltipFromHover(delay) {
    debounce(this, '_attemptShowTooltipFromHover', delay);
  },

  _scheduleHideTooltipFromHover() {
    debounce(this, '_attemptHideTooltipFromHover', this.hoverDelayOut);
  },

  _attemptShowTooltipFromHover() {
    if (this.isOver) {
      this._attemptShowTooltip();
    }
  },

  _attemptHideTooltipFromHover() {
    if (this._tooltip && !this._tooltip.isOver) {
      this._attemptHideTooltip();
    }
  },

  _attemptShowTooltip() {
    if (!this.isDestroyed && !this._tooltip) {
      this._renderTooltip();
    }
  },

  _attemptHideTooltip() {
    if (!this.isDestroyed && this._tooltip) {
      this._tooltip.send('hide');
    }
  },

  _renderTooltip() {
    this.get('tooltipService').activate(this);
  },

  _destroyTooltip() {
    this.get('tooltipService').deactivate(this);
  }
});
