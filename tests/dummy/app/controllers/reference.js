import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ReferenceController extends Controller {
  @tracked row;

  @action
  registerRow(element) {
    this.row = element;
  }
}
