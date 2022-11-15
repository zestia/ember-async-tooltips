import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, waitFor, settled, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | sticky', function (hooks) {
  setupTooltipperTest(hooks);

  test('stickyness', async function (assert) {
    assert.expect(7);

    await render(hbs`
      <div class="a1">a1 <Tooltip @showDelay={{1000}} @stickyID="A">a1</Tooltip></div>
      <div class="a2">a2 <Tooltip @showDelay={{1000}} @stickyID="A">a1</Tooltip></div>
      <div class="b1">b1 <Tooltip @showDelay={{1000}} @stickyID="B">b1</Tooltip></div>
      <div class="b2">b1 <Tooltip @showDelay={{1000}} @stickyID="B">b2</Tooltip></div>
    `);

    // A1

    this.startTimer();

    triggerEvent('.a1', 'mouseenter');

    await waitFor('.a1 .tooltip');

    assert.dom('.a1 .tooltip').hasAttribute('data-sticky', 'false');

    this.stopTimer();

    assert.ok(this.timeTaken() >= 1000);

    await settled();

    assert.dom('.a1 .tooltip').hasAttribute('data-sticky', 'true');

    // A2

    this.startTimer();

    await triggerEvent('.a2', 'mouseenter');

    assert.dom('.a2 .tooltip').hasAttribute('data-sticky', 'true');

    this.stopTimer();

    assert.ok(this.timeTaken() < 1000);

    // B1

    this.startTimer();

    await triggerEvent('.b1', 'mouseenter');

    this.stopTimer();

    assert.ok(this.timeTaken() >= 1000);

    // B2

    this.startTimer();

    await triggerEvent('.b2', 'mouseenter');

    this.stopTimer();

    assert.ok(this.timeTaken() < 1000);
  });
});
