import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ManualPositioningController extends Controller {
  @tracked shouldShowTooltip;

  @action
  showTooltip() {
    this.shouldShowTooltip = true;
  }

  @action
  hideTooltip() {
    this.shouldShowTooltip = false;
  }
}
