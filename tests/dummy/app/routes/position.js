import Route from '@ember/routing/route';

export default Route.extend({
  activate() {
    this._super(...arguments);
    this.controllerFor('application').set('showLayout', false);
    document.querySelector('body').classList.remove('has-layout');
  },

  deactivate() {
    this._super(...arguments);
    this.controllerFor('application').set('showLayout', true);
    document.querySelector('body').classList.add('has-layout');
  }
});
