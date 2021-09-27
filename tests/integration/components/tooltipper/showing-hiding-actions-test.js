import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, waitFor } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import waitForAnimation from '../../../helpers/wait-for-animation';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('showing / hiding actions', async function (assert) {
    assert.expect(6);

    this.tooltipShown = () => assert.step('tooltip shown');
    this.tooltipHidden = () => assert.step('tooltip hidden');

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "tooltip"}}
        @showTooltip={{this.showTooltip}}
        @onShowTooltip={{this.tooltipShown}}
        @onHideTooltip={{this.tooltipHidden}}
      />
    `);

    this.set('showTooltip', true);

    await waitFor('.tooltip--showing');

    assert.verifySteps([], 'does not fire actions when rendering');

    await waitForAnimation('.tooltip', 'fade-in');

    assert.verifySteps(
      ['tooltip shown'],
      'fires show action after animating in'
    );

    this.set('showTooltip', false);

    await waitFor('.tooltip--hiding');

    assert.verifySteps([], 'does not fire actions when rendering');

    await waitForAnimation('.tooltip', 'fade-out');

    assert.verifySteps(
      ['tooltip hidden'],
      'fires hide action after animating out'
    );
  });
});
