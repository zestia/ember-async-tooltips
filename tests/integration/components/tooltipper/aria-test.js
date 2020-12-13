import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('aria', async function (assert) {
    assert.expect(6);

    await render(hbs`
      <Tooltipper
        @showTooltip={{this.showTooltip}}
        @tooltip={{component "tooltip"}}
      />
    `);

    assert
      .dom('.tooltipper')
      .doesNotHaveAttribute(
        'aria-describedby',
        'the tooltipper is not described by anything (yet)'
      );

    this.set('showTooltip', true);

    assert
      .dom('.tooltip')
      .hasAttribute('role', 'tooltip', 'has an appropriate aria role');

    const [id] = find('.tooltipper').getAttribute('id').match(/\d+/);

    assert
      .dom('.tooltip')
      .hasAttribute('id', `tooltip-${id}`, 'has an id based on its tooltipper');

    assert
      .dom('.tooltip')
      .hasClass('tooltip--showing', 'will be showing by default');

    assert
      .dom('.tooltip')
      .doesNotHaveAttribute(
        'title',
        "does not splat the attributes, because component helper doesn't support this yet"
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
