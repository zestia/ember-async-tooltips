import Service from '@ember/service';
import { A as emberA } from '@ember/array';
import { all } from 'rsvp';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.set('tooltippers', emberA());
  },

  add(tooltipper) {
    this.tooltippers.addObject(tooltipper);
  },

  remove(tooltipper) {
    this.tooltippers.removeObject(tooltipper);
  },

  hideAllTooltips() {
    return all(
      this.tooltippers.reduce((promises, tooltipper) => {
        promises.push(tooltipper.actions.hideTooltip.call(tooltipper));
        return promises;
      }, [])
    );
  }
});
