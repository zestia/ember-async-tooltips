import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class InElementController extends Controller {
  @tracked elsewhere;

  @action
  registerElsewhere(element) {
    this.elsewhere = element;
  }
}
