import { Promise } from 'rsvp';
import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';
import layout from '../templates/components/tool-tip';
import autoPosition from '../utils/auto-position';
const {
  positionToString,
  positionCoords,
  positionBoundary,
  stringToPosition,
  elementPosition
} = window.positionUtils;

export default Component.extend({
  layout,

  classNames: ['tooltip'],
  classNameBindings: ['isShowing:is-showing:is-hiding', 'isNorth', 'isEast', 'isSouth', 'isWest'],
  attributeBindings: ['role'],

  role: 'tooltip',
  isShowing: true,
  isOver: false,
  tooltipperInstance: null,

  _onInsert() {},
  _onMouseLeave() {},
  _onHide() {},

  didInsertElement() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, '_inserted');
  },

  didRender() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, '_position');
  },

  actions: {
    hide() {
      return this._hide().then(() => this._onHide());
    }
  },

  mouseEnter() {
    this._super(...arguments);
    this.set('isOver', true);
  },

  mouseLeave() {
    this._super(...arguments);
    this.set('isOver', false);
    this._onMouseLeave();
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
    this._onInsert(this);
  },

  _position() {
    if (!this.tooltipperInstance) {
      return;
    }

    const tooltip = this.element;
    const tooltipper = this.tooltipperInstance.referenceElement;
    const position = this._tooltipPosition();
    const string = positionToString(position);
    const [left, top] = positionCoords(string, tooltip, tooltipper, window);

    this.setProperties(this._positionClassNames(position));

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  },

  _tooltipBoundary() {
    const doc = document.documentElement;
    return positionBoundary(doc, this.columns, this.rows);
  },

  _tooltipPosition() {
    const string = this.position;

    if (string) {
      return stringToPosition(string);
    } else {
      return autoPosition(this._tooltipperPosition());
    }
  },

  _tooltipperPosition() {
    const tooltipper = this.tooltipperInstance.referenceElement;
    const boundary = this._tooltipBoundary();
    return elementPosition(tooltipper, boundary);
  },

  _positionClassNames(position) {
    return {
      isNorth: position.N,
      isEast: position.E,
      isSouth: position.S,
      isWest: position.W
    };
  }
});
