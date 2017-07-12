import Service from '@ember/service';
import { A as emberA } from '@ember/array';

/**
 * This service keeps track of which tooltippers are active (being hovered over)
 * and therefore should have their tooltips rendered in the DOM.
 *
 * See: {{render-active-tooltips}}
 */
export default Service.extend({
  init() {
    this._super(...arguments);
    this.set('tooltippers', emberA());
  },

  activate(tooltipper) {
    this.get('tooltippers').addObject(tooltipper);
  },

  deactivate(tooltipper) {
    this.get('tooltippers').removeObject(tooltipper);
  }
});