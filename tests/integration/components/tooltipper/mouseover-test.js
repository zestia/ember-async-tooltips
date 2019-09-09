import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function(hooks) {
  setupTooltipperTest(hooks);

  test('mouse over', async function(assert) {
    assert.expect(2);

    await render(hbs`<Tooltipper @tooltip={{component "tooltip"}} />`);

    assert.dom('.tooltip').doesNotExist('does not render too');

    await triggerEvent('.tooltipper', 'mouseenter');

    assert
      .dom('.tooltip')
      .exists('renders tooltip when mousing over the toolipper');
  });
});
