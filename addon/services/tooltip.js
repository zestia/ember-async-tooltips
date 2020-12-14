import Service from '@ember/service';
import { all } from 'rsvp';

export default class TooltipService extends Service {
  tooltippers = [];

  add(tooltipper) {
    this.tooltippers.push(tooltipper);
  }

  remove(tooltipper) {
    this.tooltippers.splice(this.tooltippers.indexOf(tooltipper), 1);
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
