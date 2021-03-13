import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('showing / hiding class', async function (assert) {
    assert.expect(4);

    this.showTooltip = true;

    await render(hbs`
      <Tooltipper
        @showTooltip={{this.showTooltip}}
        @Tooltip={{component "tooltip"}}
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
  });
});
