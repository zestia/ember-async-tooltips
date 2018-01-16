import RSVP from 'rsvp';
import Component from '@ember/component';
/* eslint-disable */
import { computed, trySet } from '@ember/object';
/* eslint-enable */
import { inject } from '@ember/service';
import { debounce } from '@ember/runloop';
import { isPresent } from '@ember/utils';

export default Component.extend({
  tagName: 'span',
  classNames: ['tooltipper'],
  classNameBindings: ['instance:has-tooltip'],
  attributeBindings: [
    'tabindex',
    'href',
    'target',
    'rel',
    'typeAttr:type',
    'draggable'
  ],

  tooltipService: inject('tooltip'),

  typeAttr: computed(function() {
    return this.get('type') ? this.get('type') : 'button';
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    this._setCustomHoverDelay();
  },

  willDestroyElement() {
    this._super(...arguments);
    this._destroyTooltip();
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

  showTooltip() {
    this._load().then(() => {
      this._attemptShowTooltip();
    });
  },

  _load() {
    const loader = this.get('on-load');
    if (typeof loader === 'function') {
      return loader().then(data => trySet(this, 'data', data));
    } else {
      return RSVP.resolve();
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
    if (this.get('instance') && !this.get('instance.isOver')) {
      this._attemptHideTooltip();
    }
  },

  _attemptShowTooltip() {
    if (!this.get('isDestroyed') && !this.get('instance')) {
      this._renderTooltip();
    }
  },

  _attemptHideTooltip() {
    if (!this.get('isDestroyed') && this.get('instance')) {
      this.get('instance').hide();
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
      this.set('instance', tooltip);
    },

    tooltipExited() {
      this._scheduleHideTooltipFromHover();
    },

    tooltipHidden() {
      this._destroyTooltip();
      this.set('instance', null);
    }
  }
});
