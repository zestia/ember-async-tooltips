import ToolTipperComponent from '@zestia/ember-async-tooltips/components/tool-tipper';

export default ToolTipperComponent.extend({
  referenceElement() {
    return this.element.parentNode.parentNode;
  }
});
