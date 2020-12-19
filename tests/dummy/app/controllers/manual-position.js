import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ManualPositioningController extends Controller {
  @tracked position = 'top left';

  @action
  setPosition({ target: { value } }) {
    this.position = value;
  }
}
