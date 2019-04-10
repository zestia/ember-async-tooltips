import Ember from 'ember';
import { Promise } from 'rsvp';
import Controller from '@ember/controller';
/* eslint-disable */
import { computed } from '@ember/object';
/* eslint-enable */
import { htmlSafe } from '@ember/string';
import { run, later, debounce, bind } from '@ember/runloop';
const { escapeExpression } = Ember.Handlebars.Utils;
const { positionBoundary } = window.positionUtils;

export default Controller.extend({
  init() {
    this._super(...arguments);
    this._reset();
    this._updateBoundary();
    window.onresize = bind(this, '_resized');
  },

  actions: {
    rerender() {
      this._reset();

      run(() => this.set('showTooltipper', false));
      run(() => this.set('showTooltipper', true));

      this._updateBoundary();
    },

    setPosition(position) {
      this.set('position', position);
    },

    setRows(rows) {
      this.set('rows', rows);
      this._updateBoundary();
    },

    setColumns(columns) {
      this.set('columns', columns);
      this._updateBoundary();
    },

    setShowDelay(delay) {
      this.set('showDelay', delay);
    },

    setHideDelay(delay) {
      this.set('hideDelay', delay);
    },

    setLoadDelay(loadDelay) {
      this.set('loadDelay', loadDelay);
    },

    reposition(e) {
      const [x, y] = this.lastPos;
      const [t, l] = this.startPos;

      const element = e.target;
      const top = y - l;
      const left = x - t;

      element.style.top = `${top}px`;
      element.style.left = `${left}px`;
    },

    storeStartPos(e) {
      const pos = e.target.getBoundingClientRect();

      this.set('startPos', [e.clientX - pos.left, e.clientY - pos.top]);
    },

    storeLastPos(e) {
      const { clientX: x, clientY: y } = e;

      if (x && y) {
        this.set('lastPos', [x, y]);
      }
    },

    load() {
      this.set('isLoading', true);

      return new Promise(resolve => {
        later(() => {
          this.set('isLoading', false);
          resolve();
        }, this.loadDelay);
      });
    }
  },

  _reset() {
    this.set('columns', 3);
    this.set('rows', 3);
    this.set('showDelay', 500);
    this.set('hideDelay', 0);
    this.set('loadDelay', 500);
    this.set('showTooltipper', true);
  },

  _resized() {
    debounce(this, '_updateBoundary', 200);
  },

  _boundary() {
    const doc = document.documentElement;
    return positionBoundary(doc, this.columns, this.rows);
  },

  _boundaryStyles() {
    const { top, right, bottom, left } = this._boundary();
    const width = right - left || 1;
    const height = bottom - top || 1;
    return htmlSafe(
      escapeExpression(`
      width: ${width}px;
      height: ${height}px;
    `)
    );
  },

  _updateBoundary() {
    this.set('boundaryStyles', this._boundaryStyles());
  }
});
