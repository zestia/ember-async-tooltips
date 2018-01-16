import Component from '@ember/component';
import { inject } from '@ember/service';
/* eslint-disable */
import { readOnly } from '@ember/object/computed';
/* eslint-enable */
import layout from '../templates/components/render-active-tooltips';

export default Component.extend({
  layout,
  tagName: '',
  tooltipService: inject('tooltip'),
  tooltippers: readOnly('tooltipService.tooltippers')
});
