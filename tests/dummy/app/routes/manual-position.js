import Route from '@ember/routing/route';

export default class ManualPositionRoute extends Route {
  resetController(controller, isExiting) {
    if (isExiting) {
      controller.position = 'top left';
    }
  }
}
