import Mixin from '@ember/object/mixin';
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

  position() {
    const reference = this.get('reference-element');

    if (!reference) {
      return;
    }

    const placement   = this._determinePlacement();
    const string      = placementToString(placement);
    const [left, top] = placementCoords(this.get('element'), reference, string);

    this.setProperties(this._placementClassNames(placement));

    this.set('element.style.top', `${top}px`);
    this.set('element.style.left', `${left}px`);
  },

  _placementBoundary(container) {
    return placementBoundary(container, this.get('columns'), this.get('rows'));
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
    const reference = this.get('reference-element');
    const boundary  = this._placementBoundary(document.documentElement);
    let placement   = determinePlacement(reference, boundary);
    const center    = !hasPlacement(placement);

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
