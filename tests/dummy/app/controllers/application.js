import Ember from 'ember';
import { Promise } from 'rsvp';
import Controller from '@ember/controller';
/* eslint-disable */
import { computed } from '@ember/object';
/* eslint-enable */
import { htmlSafe } from '@ember/string';
import { run, later, debounce, bind } from '@ember/runloop';
const { escapeExpression } = Ember.Handlebars.Utils;
const pos = window.positionUtils;

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.set('columns', 3);
    this.set('rows', 3);
    this.set('hoverDelay', 0);
    this.set('loadDelay', 1000);
    this.set('showTooltipper', true);
    this._updateBoundary();
    window.onresize = bind(this, '_resized');
  },

  actions: {
    rerender() {
      run(() => this.set('showTooltipper', false));
      run(() => this.set('showTooltipper', true));
    },

    setPosition(position) {
      this.set('position', position);
    },

    setTranslateX(translateX) {
      const root = document.querySelector(':root');
      root.classList.toggle('translate-x', translateX);
    },

    setRows(rows) {
      this.set('rows', rows);
      this._updateBoundary();
    },

    setColumns(columns) {
      this.set('columns', columns);
      this._updateBoundary();
    },

    setHoverDelay(hoverDelay) {
      this.set('hoverDelay', hoverDelay);
    },

    setLoadDelay(loadDelay) {
      this.set('loadDelay', loadDelay);
    },

    reposition(e) {
      const element = e.target;
      const top = e.pageY - element.offsetHeight;
      const left = e.pageX;
      element.style.top = `${top}px`;
      element.style.left = `${left}px`;
      element.style.position = 'absolute';
    },

    load() {
      return new Promise(resolve => {
        later(resolve, this.get('loadDelay'));
      });
    }
  },

  _resized() {
    debounce(this, '_updateBoundary', 200);
  },

  _boundary() {
    const doc = document.documentElement;
    return pos.positionBoundary(doc, this.get('columns'), this.get('rows'));
  },

  _boundaryStyles() {
    const { top, right, bottom, left } = this._boundary();
    const width  = right  - left || 1;
    const height = bottom - top  || 1;
    return htmlSafe(escapeExpression(`
      width: ${width}px;
      height: ${height}px;
    `));
  },

  _updateBoundary() {
    this.set('boundaryStyles', this._boundaryStyles());
  }
});
