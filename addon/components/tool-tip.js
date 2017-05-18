import RSVP from 'rsvp';
import Component from 'ember-component';
import { scheduleOnce } from 'ember-runloop';
import Positionable from '../mixins/positionable';
import layout from '../templates/components/tool-tip';

export default Component.extend(Positionable, {
  layout,
  classNames: ['tooltip'],
  classNameBindings: ['isShowing:is-showing:is-hiding'],

  ariaRole: 'tooltip',
  isShowing: true,
  isOver: false,

  didInsertElement() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, '_inserted');
  },

  didRender() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, 'position');
  },

  mouseEnter() {
    this._super(...arguments);
    this.set('isOver', true);
  },

  mouseLeave() {
    this._super(...arguments);
    this.set('isOver', false);
    const action = this.get('on-mouse-leave');
    if (typeof action === 'function') {
      action();
    }
  },

  _show() {
    this.set('isShowing', true);
  },

  _hide() {
    return new RSVP.Promise(resolve => {
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
    const action = this.get('on-insert');
    if (typeof action === 'function') {
      action(this);
    }
  },

  actions: {
    hide() {
      this.hide();
    }
  }
});
