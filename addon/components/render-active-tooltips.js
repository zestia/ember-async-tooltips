import Component from 'ember-component';
import inject from 'ember-service/inject';
import { readOnly } from 'ember-computed';
import layout from '../templates/components/render-active-tooltips';

export default Component.extend({
  layout,
  tagName: '',
  tooltipService: inject('tooltip'),
  tooltippers: readOnly('tooltipService.tooltippers')
});
