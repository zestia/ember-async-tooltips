import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    getReferenceElement(tooltipper) {
      return tooltipper.closest('tr');
    },
  },
});
