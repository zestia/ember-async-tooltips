import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, settled, waitFor } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('showing / hiding class', async function (assert) {
    assert.expect(4);

    this.showTooltip = true;

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "tooltip"}}
        @showTooltip={{this.showTooltip}}
      />
    `);

    assert
      .dom('.tooltip')
      .hasClass(
        'tooltip--showing',
        'precondition: is showing class is added to trigger animations'
      );

    assert
      .dom('.tooltip')
      .doesNotHaveClass('tooltip--hiding', 'precondition: is not hiding');

    this.set('showTooltip', false);

    await waitFor('.tooltip');

    assert
      .dom('.tooltip')
      .doesNotHaveClass(
        'tooltip--showing',
        'is showing class is removed to trigger animations'
      );

    assert
      .dom('.tooltip')
      .hasClass(
        'tooltip--hiding',
        'is hiding class is added to trigger animations'
      );

    await settled();
  });
});
