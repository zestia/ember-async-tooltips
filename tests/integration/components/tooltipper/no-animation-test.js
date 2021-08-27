import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('no animation', async function (assert) {
    assert.expect(6);

    this.handleShow = () => assert.step('show');
    this.handleHide = () => assert.step('hide');

    await render(hbs`
      <style>
        .tooltip { animation-name: none }
      </style>
      <Tooltipper
        @Tooltip={{component "tooltip" text="Hello World"}}
        @onShowTooltip={{this.handleShow}}
        @onHideTooltip={{this.handleHide}}
      />
    `);

    assert.dom('.tooltip').doesNotExist();

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltip').exists();

    await triggerEvent('.tooltipper', 'mouseleave');

    assert.dom('.tooltip').doesNotExist();

    assert.verifySteps(['show', 'hide']);
  });
});
