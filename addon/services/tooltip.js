import Service from '@ember/service';
import { all } from 'rsvp';
import { tracked } from '@glimmer/tracking';

export default class TooltipService extends Service {
  tooltippers = [];
  @tracked sticky = {};

  add = (tooltipper) => {
    this.tooltippers.push(tooltipper);
  };

  remove = (tooltipper) => {
    this.tooltippers.splice(this.tooltippers.indexOf(tooltipper), 1);
  };

  hideAllTooltips = () => {
    return all(
      this.tooltippers.reduce((promises, tooltipper) => {
        promises.push(tooltipper.hideTooltip(tooltipper));
        return promises;
      }, [])
    );
  };

  setSticky = (tooltipper, value) => {
    this.sticky[tooltipper.args.stickyID] = value;
    this.sticky = { ...this.sticky };
  };
}
