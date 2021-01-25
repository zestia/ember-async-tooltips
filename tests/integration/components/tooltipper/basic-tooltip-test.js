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
        @tooltip={{component "tooltip" text="Hello World"}}
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
        @showTooltip={{true}}
        @tooltip={{component "greeting-tooltip"}}
      />
    `);

    assert
      .dom('.tooltipper > .tooltip.greeting-tooltip')
      .exists('custom tooltip is rendered as a child');
  });

  test('class name', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <Tooltipper
        @showTooltip={{this.showTooltip}}
        @tooltip={{component "tooltip" text="Hello World"}}
      />
    `);

    assert
      .dom('.tooltipper')
      .doesNotHaveClass(
        'tooltipper--has-tooltip',
        'tooltipper is not showing tooltip yet'
      );

    this.set('showTooltip', true);

    assert
      .dom('.tooltipper')
      .hasClass(
        'tooltipper--has-tooltip',
        "has a class name to signify the tooltipper's tooltip is present"
      );
  });
});
