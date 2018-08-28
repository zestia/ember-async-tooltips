/* eslint-disable */
import { computed, trySet } from '@ember/object';
import { bool } from '@ember/object/computed';
/* eslint-enable */
import { resolve } from 'rsvp';
import Component from '@ember/component';
import layout from '../templates/components/tool-tipper';
import { inject } from '@ember/service';
import { debounce } from '@ember/runloop';
import { isPresent } from '@ember/utils';

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

  onLoad() {},

  hasTooltip: bool('_tooltip'),

  typeAttr: computed(function() {
    if (this.tagName === 'button') {
      return this.type || 'button';
    }
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    this._setCustomHoverDelay();
  },

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
      const max   = this.hoverDelay;
      const delay = wait > max ? 0 : max - wait;
      return delay;
    });
  },

  _setCustomHoverDelay() {
    const defaultDelay = this.getWithDefault('hoverDelay', 0);
    const customDelay  = this['hover-delay'];
    this.set('hoverDelay', isPresent(customDelay) ? customDelay : defaultDelay);
  },

  _scheduleShowTooltipFromHover(delay) {
    debounce(this, '_attemptShowTooltipFromHover', delay);
  },

  _scheduleHideTooltipFromHover() {
    debounce(this, '_attemptHideTooltipFromHover', this.hoverDelay);
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
    this.tooltipService.activate(this);
  },

  _destroyTooltip() {
    this.tooltipService.deactivate(this);
  }
});
