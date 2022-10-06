import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, find, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('aria', async function (assert) {
    assert.expect(7);

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "tooltip"}}
        @showTooltip={{this.showTooltip}}
      />
    `);

    assert
      .dom('.tooltipper')
      .doesNotHaveAttribute(
        'aria-describedby',
        'the tooltipper is not described by anything (yet)'
      );

    this.set('showTooltip', true);

    await settled();

    assert
      .dom('.tooltip')
      .hasAttribute('role', 'tooltip', 'has an appropriate aria role');

    const [id] = find('.tooltipper').getAttribute('id').match(/\d+/);

    assert
      .dom('.tooltip')
      .hasAttribute('id', `tooltip-${id}`, 'has an id based on its tooltipper');

    assert
      .dom('.tooltip')
      .hasAttribute('data-showing', 'true', 'will be showing by default');

    assert
      .dom('.tooltip')
      .doesNotHaveAttribute(
        'title',
        "does not splat the attributes, because component helper doesn't support this yet"
      );

    assert
      .dom('.tooltip')
      .hasAttribute(
        'aria-live',
        'polite',
        "once loaded and rendered, the tooltip's description will be politely announced by screen readers"
      );

    assert
      .dom('.tooltipper')
      .hasAttribute(
        'aria-describedby',
        `tooltip-${id}`,
        'the tooltipper will be described by the tooltip'
      );
  });
});
