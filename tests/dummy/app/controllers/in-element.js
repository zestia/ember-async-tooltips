import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class InElementController extends Controller {
  @tracked elsewhere;

  @action
  registerElsewhere(element) {
    this.elsewhere = element;
  }
}
