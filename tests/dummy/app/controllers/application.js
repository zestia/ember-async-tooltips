import Ember from 'ember';
import { Promise } from 'rsvp';
import Controller from '@ember/controller';
/* eslint-disable */
import { computed } from '@ember/object';
/* eslint-enable */
import { htmlSafe } from '@ember/string';
import { later } from '@ember/runloop';
import {
  placementBoundary
} from '@zestia/ember-async-tooltips/utils/placement';
const { escapeExpression } = Ember.Handlebars.Utils;

export default Controller.extend({
  columns: 3,
  rows: 3,
  hoverDelay: 0,
  loadDelay: 0,

  boundary: computed('columns', 'rows', function() {
    return placementBoundary(window, this.get('columns'), this.get('rows'));
  }),

  boundaryStyles: computed('boundary', function() {
    const { top, right, bottom, left } = this.get('boundary');
    const width  = right  - left || 1;
    const height = bottom - top  || 1;
    return htmlSafe(escapeExpression(`
      width: ${width}px;
      height: ${height}px;
    `));
  }),

  actions: {
    setTranslateX(translateX) {
      const root = document.querySelector(':root');
      root.classList.toggle('translate-x', translateX);
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
  }
});
