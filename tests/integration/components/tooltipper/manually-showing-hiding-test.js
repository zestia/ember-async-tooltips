import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('manually showing / hiding test', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "tooltip"}}
        @showTooltip={{this.showTooltip}}
      />
    `);

    assert.dom('.tooltip').doesNotExist('precondition: tooltip not present');

    this.set('showTooltip', true);

    await settled();

    assert
      .dom('.tooltipper > .tooltip')
      .exists('tooltip can be shown on demand by via showTooltip argument');

    this.set('showTooltip', false);

    await settled();

    assert
      .dom('.tooltip')
      .doesNotExist(
        'tooltip can be hidden on demand by the showTooltip argument'
      );
  });
});
