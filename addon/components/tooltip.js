import { Promise } from 'rsvp';
import Component from '@ember/component';
import layout from '../templates/components/tooltip';
import { htmlSafe, dasherize } from '@ember/string';
import { set, computed } from '@ember/object';
import autoPosition from '../utils/auto-position';
import { getPosition, getCoords } from '@zestia/position-utils';

export default Component.extend({
  layout,
  tagName: '',

  // Arguments

  adjust: true,
  columns: 3,
  position: null,
  rows: 3,

  // State

  domElement: null,
  isShowing: true,
  tooltipperInstance: null,
  adjustedPosition: '',
  coords: null,

  _onInit() {},

  // Computed state

  style: computed('coords', function() {
    return htmlSafe(`top: ${this.coords.top}px; left: ${this.coords.left}px`);
  }),

  positionClass: computed('adjustedPosition', function() {
    return `is-${dasherize(this.adjustedPosition)}`;
  }),

  init() {
    this._super(...arguments);
    set(this, 'coords', {});
    this._onInit(this);
  },

  actions: {
    // Internal actions

    didInsertElement(element) {
      set(this, 'domElement', element);

      this._position();
    },

    didUpdateElement() {
      this._position();
    },

    willDestroyElement() {
      set(this, 'domElement', null);
    },

    // Public Actions

    hide() {
      return this._hide().then(() => {
        this._onHide();
      });
    }
  },

  _hide() {
    return new Promise(resolve => {
      this.domElement.addEventListener('animationend', resolve, { once: true });
      set(this, 'isShowing', false);
    });
  },

  _position() {
    if (!this.referenceElement) {
      return;
    }

    const element = this.domElement;
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
    set(this, 'adjustedPosition', coords.position);
  }
});
