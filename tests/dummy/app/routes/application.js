import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  activate() {
    super.activate(...arguments);
    this.controllerFor('application').set('showLayout', true);
  }
}
