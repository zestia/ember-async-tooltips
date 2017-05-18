import Ember from 'ember';
import RSVP from 'rsvp';
import Controller from 'ember-controller';
import jQuery from 'jquery';
import computed from 'ember-computed';
import { htmlSafe } from 'ember-string';
import { later } from 'ember-runloop';
const { escapeExpression } = Ember.Handlebars.Utils;
import { placementBoundary } from 'ember-async-tooltips/utils/placement';

export default Controller.extend({
  columns: 3,
  rows: 3,
  hoverDelay: 0,
  loadDelay: 0,

  boundary: computed('columns', 'rows', function() {
    const $container = jQuery(window);
    return placementBoundary($container, this.get('columns'), this.get('rows'));
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
      jQuery(':root').toggleClass('translate-x', translateX);
    },

    reposition(e) {
      const $el  = jQuery(e.target);
      const top  = e.pageY - $el.outerHeight();
      const left = e.pageX;
      $el.css({
        top: `${top}px`,
        left: `${left}px`,
        position: 'absolute'
      });
    },

    load() {
      return new RSVP.Promise(resolve => {
        later(resolve, this.get('loadDelay'));
      });
    }
  }
});
