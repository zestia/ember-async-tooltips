import { Promise } from 'rsvp';
import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';
import layout from '../templates/components/tool-tip';
import {
  placementCoords,
  determinePlacement,
  placementBoundary,
  placementToString,
  stringToPlacement,
  hasPlacement
} from '../utils/placement';

export default Component.extend({
  layout,
  classNames: ['tooltip'],
  classNameBindings: [
    'isShowing:is-showing:is-hiding',
    'isNorth',
    'isEast',
    'isSouth',
    'isWest'
  ],

  ariaRole: 'tooltip',
  isShowing: true,
  isOver: false,

  didInsertElement() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, '_inserted');
  },

  didRender() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, '_position');
  },

  'on-hide'() {},
  'on-insert'() {},
  'on-mouse-leave'() {},

  mouseEnter() {
    this._super(...arguments);
    this.set('isOver', true);
  },

  mouseLeave() {
    this._super(...arguments);
    this.set('isOver', false);
    this.get('on-mouse-leave')();
  },

  _show() {
    this.set('isShowing', true);
  },

  _hide() {
    return new Promise(resolve => {
      this.one('animationEnd', resolve);
      this.set('isShowing', false);
    });
  },

  hide() {
    return this._hide().then(() => {
      this.get('on-hide')();
    });
  },

  _inserted() {
    this.get('on-insert')(this);
  },

  _position() {
    if (!this.get('_tooltipper')) {
      return;
    }

    const tooltip     = this.get('element');
    const tooltipper  = this.get('_tooltipper.element');
    const placement   = this._determinePlacement();
    const string      = placementToString(placement);
    const [left, top] = placementCoords(string, tooltip, tooltipper);

    this.setProperties(this._placementClassNames(placement));

    tooltip.style.top  = `${top}px`;
    tooltip.style.left = `${left}px`;
  },

  _placementBoundary() {
    return placementBoundary(this.get('columns'), this.get('rows'));
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
    const tooltipper = this.get('_tooltipper.element');
    const boundary   = this._placementBoundary();
    const placement  = determinePlacement(tooltipper, boundary);
    const center     = !hasPlacement(placement);

    const flippedPlacement = {
      N: placement.S,
      E: placement.E,
      S: placement.N,
      W: placement.W
    };

    if (center) {
      flippedPlacement.S = true;
    }

    return flippedPlacement;
  },

  _placementClassNames(placement) {
    return {
      isNorth: placement.N,
      isEast:  placement.E,
      isSouth: placement.S,
      isWest:  placement.W
    };
  },

  actions: {
    hide() {
      this.hide();
    }
  }
});
