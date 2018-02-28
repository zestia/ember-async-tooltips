import { Promise } from 'rsvp';
import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';
import layout from '../templates/components/tool-tip';
const pos = window.positionUtils;

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

  '-on-hide'() {},
  '-on-insert'() {},
  '-on-mouse-leave'() {},

  mouseEnter() {
    this._super(...arguments);
    this.set('isOver', true);
  },

  mouseLeave() {
    this._super(...arguments);
    this.set('isOver', false);
    this.get('-on-mouse-leave')();
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

  _inserted() {
    this.get('-on-insert')(this);
  },

  _position() {
    if (!this.get('_tooltipper')) {
      return;
    }

    const tooltip     = this.get('element');
    const tooltipper  = this.get('_tooltipper.element');
    const position    = this._tooltipPosition();
    const string      = pos.positionToString(position);
    const doc         = document.documentElement;
    const [left, top] = pos.positionCoords(string, tooltip, tooltipper, doc);

    this.setProperties(this._positionClassNames(position));

    tooltip.style.top  = `${top}px`;
    tooltip.style.left = `${left}px`;
  },

  _tooltipBoundary() {
    const doc = document.documentElement;
    return pos.positionBoundary(doc, this.get('columns'), this.get('rows'));
  },

  _tooltipPosition() {
    const string = this.get('position');

    if (string) {
      return pos.stringToPosition(string);
    } else {
      return this._autoPosition();
    }
  },

  _tooltipperPosition() {
    const tooltipper = this.get('_tooltipper.element');
    const boundary = this._tooltipBoundary();
    return pos.elementPosition(tooltipper, boundary);
  },

  _autoPosition() {
    const before = this._tooltipperPosition();

    const after = {
      N: before.S,
      E: before.E,
      S: before.N,
      W: before.W
    };

    if (!pos.hasDirection(after)) {
      after.S = true;
    }

    return after;
  },

  _positionClassNames(position) {
    return {
      isNorth: position.N,
      isEast:  position.E,
      isSouth: position.S,
      isWest:  position.W
    };
  },

  actions: {
    hide() {
      this._hide().then(() => {
        this.get('-on-hide')();
      });
    }
  }
});
