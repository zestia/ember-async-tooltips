import Service from '@ember/service';
import { A as emberA } from '@ember/array';
import { set } from '@ember/object';
import { all } from 'rsvp';

export default class TooltipService extends Service {
  init() {
    super.init(...arguments);
    set(this, 'tooltippers', emberA());
  }

  add(tooltipper) {
    this.tooltippers.addObject(tooltipper);
  }

  remove(tooltipper) {
    this.tooltippers.removeObject(tooltipper);
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
