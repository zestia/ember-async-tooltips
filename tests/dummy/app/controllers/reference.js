import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ReferenceController extends Controller {
  @tracked tr;

  @action
  registerTableRow(element) {
    this.tr = element;
  }
}
