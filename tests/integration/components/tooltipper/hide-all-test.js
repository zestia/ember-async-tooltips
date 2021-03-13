import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('hide all', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <Tooltipper
        @showTooltip={{true}}
        @Tooltip={{component "tooltip"}}
      />

      <Tooltipper
        @showTooltip={{true}}
        @Tooltip={{component "tooltip"}}
      />
    `);

    assert
      .dom('.tooltip')
      .exists({ count: 2 }, 'precondition: two tooltips are rendered');

    await this.owner.lookup('service:tooltip').hideAllTooltips();

    await settled();

    assert
      .dom('.tooltip')
      .exists({ count: 0 }, 'tooltips are no longer rendered');
  });
});
