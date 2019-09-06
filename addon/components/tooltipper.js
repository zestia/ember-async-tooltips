import Component from '@ember/component';
import { computed, trySet, set } from '@ember/object';
import { debounce } from '@ember/runloop';
import { getPosition, getCoords } from '@zestia/position-utils';
import { guidFor } from '@ember/object/internals';
import { htmlSafe, dasherize } from '@ember/string';
import { inject } from '@ember/service';
import { resolve } from 'rsvp';
import autoPosition from '../utils/auto-position';
import layout from '../templates/components/tooltipper';

export default Component.extend({
  tooltipService: inject('tooltip'),

  layout,
  tagName: '',

  // Arguments

  adjust: false,
  columns: 3,
  hideDelay: 0,
  mouseEvents: true,
  position: null,
  rows: 3,
  showDelay: 0,
  tooltip: null,

  // State

  coords: null,
  identifier: null,
  isLoaded: false,
  isLoading: false,
  isOverReferenceElement: false,
  isOverTooltip: false,
  isShowingTooltip: false,
  loadedData: null,
  loadError: null,
  referenceElement: null,
  renderTooltip: false,
  tooltipElement: null,
  tooltipperElement: null,

  // Computed state

  tooltipComponent: computed(function() {
    return this.tooltip || 'tooltip';
  }),

  tooltipStyle: computed('coords', function() {
    return htmlSafe(`top: ${this.coords.top}px; left: ${this.coords.left}px`);
  }),

  tooltipPosition: computed('coords.position', function() {
    return dasherize(this.coords.position);
  }),

  init() {
    this._super(...arguments);
    set(this, 'coords', { top: 0, left: 0, position: '' });
    set(this, 'identifier', guidFor(this).replace('ember', ''));
  },

  actions: {
    // Internal actions

    didInsertTooltipper(element) {
      set(this, 'tooltipperElement', element);
      set(this, 'referenceElement', this._getReferenceElement());

      this._setupReferenceElement();
    },

    willDestroyTooltipper() {
      this._teardownReferenceElement();
    },

    didInsertTooltip(element) {
      set(this, 'tooltipElement', element);
      this._positionTooltip();
    },

    didUpdateTooltip() {
      this._positionTooltip();
    },

    willDestroyTooltip() {
      set(this, 'tooltipElement', null);
    },

    onMouseEnterTooltip() {
      set(this, 'isOverTooltip', true);
    },

    onMouseLeaveTooltip() {
      set(this, 'isOverTooltip', false);

      if (this.mouseEvents) {
        this._scheduleHideTooltipFromHover();
      }
    },

    // Public API Actions

    hideTooltip() {
      return this._attemptHideTooltip();
    },

    showTooltip() {
      this._attemptShowTooltip();
    },

    toggleTooltip() {
      if (this.renderTooltip) {
        this._attemptHideTooltip();
      } else {
        this._attemptShowTooltip();
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
    if (typeof this.onLoad !== 'function' || this.isLoaded) {
      return resolve();
    }

    set(this, 'isLoading', true);
    return resolve(this.onLoad())
      .then(data => {
        trySet(this, 'loadedData', data);
        trySet(this, 'isLoaded', true);
      })
      .catch(error => {
        trySet(this, 'loadError', error);
      })
      .finally(() => {
        trySet(this, 'isLoading', false);
      });
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

  _scheduleShowTooltipFromHover(showDelay) {
    debounce(this, '_attemptShowTooltipFromHover', showDelay);
  },

  _scheduleHideTooltipFromHover() {
    debounce(this, '_attemptHideTooltipFromHover', this.hideDelay);
  },

  _attemptShowTooltipFromHover() {
    if (!this.isOverReferenceElement) {
      return;
    }

    this._attemptShowTooltip();
  },

  _attemptShowTooltip() {
    if (this.isDestroyed || this.renderTooltip) {
      return;
    }

    this._showTooltip();
  },

  _showTooltip() {
    set(this, 'isShowingTooltip', true);
    set(this, 'renderTooltip', true);

    this.tooltipService.add(this);
  },

  _attemptHideTooltipFromHover() {
    if (this.isOverReferenceElement) {
      return;
    }

    this._attemptHideTooltip();
  },

  _attemptHideTooltip() {
    if (this.isDestroyed || !this.renderTooltip) {
      return;
    }

    this._hideTooltip();
  },

  _hideTooltip() {
    return new Promise(resolve => {
      this.tooltipElement.addEventListener('animationend', resolve, {
        once: true
      });
      set(this, 'isShowingTooltip', false);
    }).then(() => {
      set(this, 'renderTooltip', false);
      this.tooltipService.remove(this);
    });
  },

  _getReferenceElement() {
    let element = this.tooltipperElement;

    if (typeof this.onGetReferenceElement === 'function') {
      element = this.onGetReferenceElement(this.tooltipperElement);
    }

    return element;
  },

  _setupReferenceElement() {
    if (this.mouseEvents) {
      this._startListening(this.referenceElement);
    }
  },

  _teardownReferenceElement() {
    if (this.mouseEvents) {
      this._stopListening(this.referenceElement);
    }
  },

  _positionTooltip() {
    const element = this.tooltipElement;
    const reference = this.referenceElement;
    const container = this.adjust ? window : null;

    // Get the rough position of the reference element in the window by
    // splitting it in to a grid of rows and columns and choosing a square.
    const refPosition = getPosition(reference, window, this.columns, this.rows);

    // The position of the tooltip should be the one provided, or one based
    // upon the position of the reference element, that the tooltip is for.
    const position = this.position ? this.position : autoPosition(refPosition);

    // Compute the coordinates required to place the tooltip near the reference
    // element. And, if a container is provided, attempt to adjust the position
    // further to make sure it is always visible.
    const coords = getCoords(position, element, reference, container);

    set(this, 'coords', coords);
  }
});
