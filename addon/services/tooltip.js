import Service from '@ember/service';
import { all } from 'rsvp';
import { tracked } from '@glimmer/tracking';

export default class TooltipService extends Service {
  tooltips = [];
  @tracked sticky = {};

  add = (tooltip) => {
    this.tooltips.push(tooltip);
  };

  remove = (tooltip) => {
    this.tooltips.splice(this.tooltips.indexOf(tooltip), 1);
  };

  hideAllTooltips = () => {
    return all(this.tooltips.map((tooltip) => tooltip.hide()));
  };

  setSticky = (tooltip, value) => {
    this.sticky[tooltip.args.stickyID] = value;
    this.sticky = { ...this.sticky };
  };
}
