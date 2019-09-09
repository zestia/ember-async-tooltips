import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, find, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function(hooks) {
  setupTooltipperTest(hooks);

  test('reference element', async function(assert) {
    assert.expect(2);

    await render(hbs`
      {{#if this.referenceElement}}
        <Tooltipper
          @tooltip={{component "tooltip"}}
          @referenceElement={{this.referenceElement}} />
      {{/if}}

      <div class="reference-element"></div>
    `);

    this.set('referenceElement', find('.reference-element'));

    await triggerEvent('.reference-element', 'mouseenter');

    assert
      .dom('.tooltip')
      .exists('renders tooltip when mousing over the reference element');

    await triggerEvent('.reference-element', 'mouseleave');

    await triggerEvent('.tooltip', 'animationend');

    assert
      .dom('.tooltip')
      .doesNotExist(
        'tooltip is destroyed when mousing out of the reference element'
      );
  });
});
