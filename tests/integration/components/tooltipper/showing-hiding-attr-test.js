import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, settled, waitFor } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('showing / hiding attr', async function (assert) {
    assert.expect(2);

    this.showTooltip = true;

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "tooltip"}}
        @showTooltip={{this.showTooltip}}
      />
    `);

    assert
      .dom('.tooltip')
      .hasAttribute(
        'data-showing',
        'true',
        'precondition: showing attr is added to trigger in animation'
      );

    this.set('showTooltip', false);

    await waitFor('.tooltip');

    assert
      .dom('.tooltip')
      .hasAttribute(
        'data-showing',
        'false',
        'showing attr is updated to trigger out animation'
      );

    await settled();
  });
});
