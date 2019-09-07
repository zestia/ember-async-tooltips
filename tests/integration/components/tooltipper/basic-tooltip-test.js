import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function(hooks) {
  setupTooltipperTest(hooks);

  test('it renders a tooltip', async function(assert) {
    assert.expect(5);

    await render(hbs`
      <Tooltipper
        @showTooltip={{true}}
        @tooltip={{component "foo-tooltip" title="foo"}} />
    `);

    assert
      .dom('.tooltipper > .tooltip')
      .exists('tooltip is rendered as a child');

    assert
      .dom('.tooltip')
      .hasAttribute('role', 'tooltip', 'has an appropriate aria role');

    const [id] = find('.tooltipper')
      .getAttribute('id')
      .match(/\d+/);

    assert
      .dom('.tooltip')
      .hasAttribute('id', `tooltip-${id}`, 'has an id based on its tooltipper');

    assert.dom('.tooltip').hasClass('is-showing', 'will be showing by default');

    assert
      .dom('.tooltip')
      .doesNotHaveAttribute(
        'title',
        "does not splat the attributes, because component help doesn't support this yet"
      );
  });
});
