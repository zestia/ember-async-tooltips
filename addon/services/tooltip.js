import Service from '@ember/service';
import { A as emberA } from '@ember/array';
import { all } from 'rsvp';

/**
 * This service keeps track of which tooltippers are being hovered over
 * and therefore should have their tooltips rendered in the DOM.
 *
 * See: <RenderTooltips />
 */
export default Service.extend({
  init() {
    this._super(...arguments);
    this.set('tooltippers', emberA());
  },

  activate(tooltipper) {
    this.tooltippers.addObject(tooltipper);
  },

  deactivate(tooltipper) {
    this.tooltippers.removeObject(tooltipper);
  },

  hideTooltips() {
    return all(
      this.tooltippers.reduce((promises, tooltipper) => {
        const tooltip = tooltipper.tooltipInstance;

        if (tooltip) {
          promises.push(tooltip.actions.hide.call(tooltip));
        }

        return promises;
      }, [])
    );
  }
});
