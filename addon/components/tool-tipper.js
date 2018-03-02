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

  tooltipService: inject('tooltip'),
  hasTooltip: bool('_tooltip'),

  typeAttr: computed(function() {
    if (this.get('tagName') === 'button') {
      return this.getWithDefault('type', 'button');
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

  'on-load'() {},

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
    if (this.get('isLoaded')) {
      return resolve();
    } else {
      this.set('isLoading', true);
      return resolve(this.get('on-load')()).then(data => {
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
      const max   = this.get('hoverDelay');
      const delay = wait > max ? 0 : max - wait;
      return delay;
    });
  },

  _setCustomHoverDelay() {
    const defaultDelay = this.getWithDefault('hoverDelay', 0);
    const customDelay  = this.get('hover-delay');
    this.set('hoverDelay', isPresent(customDelay) ? customDelay : defaultDelay);
  },

  _scheduleShowTooltipFromHover(delay) {
    debounce(this, '_attemptShowTooltipFromHover', delay);
  },

  _scheduleHideTooltipFromHover() {
    debounce(this, '_attemptHideTooltipFromHover', this.get('hoverDelay'));
  },

  _attemptShowTooltipFromHover() {
    if (this.get('isOver')) {
      this._attemptShowTooltip();
    }
  },

  _attemptHideTooltipFromHover() {
    if (this.get('_tooltip') && !this.get('_tooltip.isOver')) {
      this._attemptHideTooltip();
    }
  },

  _attemptShowTooltip() {
    if (!this.get('isDestroyed') && !this.get('_tooltip')) {
      this._renderTooltip();
    }
  },

  _attemptHideTooltip() {
    if (!this.get('isDestroyed') && this.get('_tooltip')) {
      this.get('_tooltip').send('hide');
    }
  },

  _renderTooltip() {
    this.get('tooltipService').activate(this);
  },

  _destroyTooltip() {
    this.get('tooltipService').deactivate(this);
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
  }
});
