import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ReferenceController extends Controller {
  @tracked span;

  @action
  registerSpan(element) {
    this.span = element;
  }
}
