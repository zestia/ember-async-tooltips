import Mixin from 'ember-metal/mixin';
import jQuery from 'jquery';
import {
  placementCoords,
  determinePlacement,
  placementBoundary,
  placementToString,
  stringToPlacement
} from '../utils/placement';

export default Mixin.create({
  classNameBindings: [
    'isNorth',
    'isEast',
    'isSouth',
    'isWest'
  ],

  $reference() {
    return jQuery(this.get('reference-element'));
  },

  position() {
    const $reference = this.$reference();

    if (!$reference.length) {
      return;
    }

    const placement   = this._determinePlacement();
    const string      = placementToString(placement);
    const [left, top] = placementCoords(this.$(), $reference, string);

    this.setProperties(this._placementClassNames(placement));

    this.$().css({ left, top });
  },

  placementBoundary($container) {
    return placementBoundary($container, this.get('columns'), this.get('rows'));
  },

  _determinePlacement() {
    const string = this.get('placement');

    if (string) {
      return stringToPlacement(string);
    } else {
      return this._autoPlacement();
    }
  },

  _autoPlacement() {
    const $reference = this.$reference();
    const $window    = jQuery(window);
    const boundary   = this.placementBoundary($window);
    const placement  = determinePlacement($reference, boundary);
    const center     = !placement.N && !placement.S;

    return {
      N: placement.S,
      E: placement.E,
      S: placement.N || center,
      W: placement.W
    };
  },

  _placementClassNames(placement) {
    return {
      isNorth: placement.N,
      isEast:  placement.E,
      isSouth: placement.S,
      isWest:  placement.W
    };
  }
});
