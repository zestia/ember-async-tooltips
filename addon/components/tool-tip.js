import { Promise } from 'rsvp';
import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';
import layout from '../templates/components/tool-tip';
import { dasherize } from '@ember/string';
import autoPosition from '../utils/auto-position';
import { position, coords } from '@zestia/position-utils';

export default Component.extend({
  layout,

  classNames: ['tooltip'],

  classNameBindings: ['isShowing:is-showing:is-hiding', 'positionClass'],

  attributeBindings: ['role'],

  role: 'tooltip',
  rows: 3,
  columns: 3,
  flip: true,
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
    const container = this.flip ? document.documentElement : null;
    const tooltipperPosition = position(tooltipper, container, this.columns, this.rows);
    const tooltipPosition = this.position ? this.position : autoPosition(tooltipperPosition);
    const tooltipCoords = coords(tooltipPosition, tooltip, tooltipper, container);
    const { top, left, position: finalPosition } = tooltipCoords;

    this.set('positionClass', `is-${dasherize(finalPosition)}`);

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }
});
