import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, find, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import waitForAnimation from '../../../helpers/wait-for-animation';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('reference element', async function (assert) {
    assert.expect(4);

    await render(hbs`
      {{#if this.referenceElement}}
        <Tooltipper
          @tooltip={{component "tooltip"}}
          @referenceElement={{this.referenceElement}} />
      {{/if}}

      <div class="reference-element-1"></div>
      <div class="reference-element-2"></div>
    `);

    this.set('referenceElement', find('.reference-element-1'));

    await triggerEvent('.reference-element-1', 'mouseenter');

    assert
      .dom('.tooltip')
      .exists('renders tooltip when mousing over the reference element');

    await triggerEvent('.reference-element-1', 'mouseleave');

    await waitForAnimation('.tooltip');

    assert
      .dom('.tooltip')
      .doesNotExist(
        'tooltip is destroyed when mousing out of the reference element'
      );

    this.set('referenceElement', find('.reference-element-2'));

    await triggerEvent('.reference-element-1', 'mouseenter');

    assert
      .dom('.tooltip')
      .doesNotExist(
        'tooltip is not displayed when hovering over original reference element'
      );

    await triggerEvent('.reference-element-2', 'mouseenter');

    assert
      .dom('.tooltip')
      .exists('renders tooltip when mousing over the new reference element');
  });
});
