import Service from '@ember/service';
import { all } from 'rsvp';
import { tracked } from '@glimmer/tracking';

export default class TooltipService extends Service {
  @tracked tooltippers = [];

  add(tooltipper) {
    this.tooltippers = [...this.tooltippers, tooltipper];
  }

  remove(tooltipper) {
    const index = this.queue.indexOf(tooltipper);

    this.tooltippers.splice(index, 1);

    this.tooltippers = [...this.tooltippers];
  }

  hideAllTooltips() {
    return all(
      this.tooltippers.reduce((promises, tooltipper) => {
        promises.push(tooltipper.actions.hideTooltip.call(tooltipper));
        return promises;
      }, [])
    );
  }
}
