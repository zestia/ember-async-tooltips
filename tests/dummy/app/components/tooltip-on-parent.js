import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TooltipOnParentComponent extends Component {
  @tracked element = null;

  get Tooltip() {
    return this.args.Tooltip;
  }

  @action
  registerElement(element) {
    this.element = element;
  }
}
