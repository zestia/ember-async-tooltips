import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ManualPositioningController extends Controller {
  @tracked shouldShowTooltip;

  @action
  toggleTooltip() {
    this.shouldShowTooltip = !this.shouldShowTooltip;
  }
}
