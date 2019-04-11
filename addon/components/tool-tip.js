import { Promise } from 'rsvp';
import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';
import layout from '../templates/components/tool-tip';
import autoPosition from '../utils/auto-position';
import { dasherize } from '@ember/string';
import { positionCoords, positionBoundary, elementPosition } from '@zestia/position-utils';

export default Component.extend({
  layout,

  classNames: ['tooltip'],

  classNameBindings: ['isShowing:is-showing:is-hiding', 'positionClass'],

  attributeBindings: ['role'],

  role: 'tooltip',
  rows: 3,
  columns: 3,
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
    const [left, top] = positionCoords(position, tooltip, tooltipper, window);

    this.set('positionClass', this._classForPosition(position));

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  },

  _tooltipBoundary() {
    const doc = document.documentElement;
    return positionBoundary(doc, this.columns, this.rows);
  },

  _tooltipPosition() {
    if (this.position) {
      return this.position;
    } else {
      return autoPosition(this._tooltipperPosition());
    }
  },

  _tooltipperPosition() {
    const tooltipper = this.tooltipperInstance.referenceElement;
    const boundary = this._tooltipBoundary();
    return elementPosition(tooltipper, boundary);
  },

  _classForPosition(position) {
    return `is-${dasherize(position)}`;
  }
});
