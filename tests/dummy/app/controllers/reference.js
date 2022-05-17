import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ReferenceController extends Controller {
  @tracked span;

  @action
  registerSpan(element) {
    this.span = element;
  }
}
