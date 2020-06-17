import Route from '@ember/routing/route';

export default class PositionRoute extends Route {
  activate() {
    super.activate(...arguments);
    this.controllerFor('application').set('showLayout', false);
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.refresh = this.refresh.bind(this);
  }

  deactivate() {
    super.activate(...arguments);
    this.controllerFor('application').set('showLayout', true);
  }
}
