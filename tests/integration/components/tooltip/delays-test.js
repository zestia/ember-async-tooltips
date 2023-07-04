import { module, test } from 'qunit';
import setupTooltipperTest from 'dummy/tests/integration/components/tooltip/setup';
import { render, waitFor, triggerEvent, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | delays', function (hooks) {
  setupTooltipperTest(hooks);

  test('hide delay', async function (assert) {
    assert.expect(4);

    await render(hbs`
      <div>
        <Tooltip @hideDelay={{100}} />
      </div>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltip').hasAttribute('data-showing', 'true');

    this.startTimer();

    triggerEvent('.tooltipper', 'mouseleave');

    await waitFor(".tooltip[data-showing='false']");

    this.stopTimer();

    this.delayed = this.timeTaken() >= 100 && this.timeTaken() <= 150;

    assert.ok(this.delayed);

    assert.dom('.tooltip').exists();

    await settled();

    assert.dom('.tooltip').doesNotExist();
  });
});
