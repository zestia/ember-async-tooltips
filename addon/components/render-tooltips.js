import Component from '@ember/component';
import { inject } from '@ember/service';
import layout from '../templates/components/render-tooltips';

export default Component.extend({
  tooltipService: inject('tooltip'),
  layout,
  tagName: ''
});
