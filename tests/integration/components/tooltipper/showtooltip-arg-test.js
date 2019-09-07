import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function(hooks) {
  setupTooltipperTest(hooks);

  test('showTooltip arg', async function(assert) {
    assert.expect(5);

    await render(hbs`
      <Tooltipper
        @showTooltip={{this.showTooltip}}
        @tooltip={{component "foo-tooltip"}} />
    `);

    assert.dom('.tooltip').doesNotExist('precondition: tooltip not present');

    this.set('showTooltip', true);

    assert
      .dom('.tooltipper > .tooltip')
      .exists('tooltip can be shown on demand by via showTooltip argument');

    this.set('showTooltip', false);

    await triggerEvent('.tooltip', 'animationend');

    assert
      .dom('.tooltip')
      .doesNotExist(
        'tooltip can be hidden on demand by the showTooltip argument'
      );
  });
});
