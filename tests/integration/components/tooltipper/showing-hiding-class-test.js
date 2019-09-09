import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function(hooks) {
  setupTooltipperTest(hooks);

  test('showing / hiding class', async function(assert) {
    assert.expect(4);

    this.set('showTooltip', true);

    await render(hbs`
      <Tooltipper
        @showTooltip={{this.showTooltip}}
        @tooltip={{component "tooltip"}} />
    `);

    assert
      .dom('.tooltip')
      .hasClass(
        'is-showing',
        'precondition: is showing class is added to trigger animations'
      );

    assert
      .dom('.tooltip')
      .doesNotHaveClass('is-hiding', 'precondition: is not hiding');

    this.set('showTooltip', false);

    assert
      .dom('.tooltip')
      .doesNotHaveClass(
        'is-showing',
        'is showing class is removed to trigger animations'
      );

    assert
      .dom('.tooltip')
      .hasClass('is-hiding', 'is hiding class is added to trigger animations');
  });
});
