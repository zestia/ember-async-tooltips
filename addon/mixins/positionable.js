import Mixin from '@ember/object/mixin';
import jQuery from 'jquery';
import {
  placementCoords,
  determinePlacement,
  placementBoundary,
  placementToString,
  stringToPlacement,
  hasPlacement
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

  _placementBoundary($container) {
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
    const boundary   = this._placementBoundary($window);
    let placement    = determinePlacement($reference, boundary);
    const center     = !hasPlacement(placement);

    placement = {
      N: placement.S,
      E: placement.E,
      S: placement.N,
      W: placement.W
    };

    if (center) {
      placement.S = true;
    }

    return placement;
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
