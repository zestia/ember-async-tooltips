/* eslint-disable ember/no-controller-access-in-routes */

import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  activate() {
    super.activate(...arguments);
    this.controllerFor('application').showLayout = true;
  }
}
