import Ember from 'ember';
const { EventDispatcher } = Ember;

// https://github.com/switchfly/ember-test-helpers/issues/75
export default EventDispatcher.extend({
  init() {
    this._super(...arguments);
    this.events.animationEnd = 'animationEnd';
  }
});
