import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('built in tooltip', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <Tooltipper
        @showTooltip={{true}}
        @tooltip={{component "tooltip" text="Hello World"}} />
    `);

    assert
      .dom('.tooltipper > .tooltip')
      .hasText('Hello World', 'built in tooltip is rendered as a child');
  });

  test('custom tooltip', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <Tooltipper
        @showTooltip={{true}}
        @tooltip={{component "custom-tooltip"}} />
    `);

    assert
      .dom('.tooltipper > .tooltip.custom-tooltip')
      .exists('custom tooltip is rendered as a child');
  });
});
