import ToolTipperComponent from '@zestia/ember-async-tooltips/components/tool-tipper';
/* eslint-disable */
import { computed } from '@ember/object';
/* eslint-enable */

export default ToolTipperComponent.extend({
  referenceElement: computed(function() {
    return this.element.parentNode.parentNode;
  })
});
