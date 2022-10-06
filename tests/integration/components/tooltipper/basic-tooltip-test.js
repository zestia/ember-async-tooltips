import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('built in tooltip', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "tooltip" text="Hello World"}}
        @showTooltip={{true}}
      />
    `);

    assert
      .dom('.tooltipper > .tooltip')
      .hasText('Hello World', 'built in tooltip is rendered as a child');
  });

  test('custom tooltip', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "greeting-tooltip"}}
        @showTooltip={{true}}
      />
    `);

    assert
      .dom('.tooltipper > .tooltip.greeting-tooltip')
      .exists('custom tooltip is rendered as a child');
  });

  test('data attribute', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "tooltip" text="Hello World"}}
        @showTooltip={{this.showTooltip}}
      />
    `);

    assert
      .dom('.tooltipper')
      .hasAttribute(
        'data-has-tooltip',
        'false',
        'tooltipper is not showing tooltip yet'
      );

    this.set('showTooltip', true);

    await settled();

    assert
      .dom('.tooltipper')
      .hasAttribute(
        'data-has-tooltip',
        'true',
        "signifies the tooltipper's tooltip is present"
      );
  });
});
