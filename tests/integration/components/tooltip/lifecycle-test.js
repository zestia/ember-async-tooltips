import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, findAll, waitUntil, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | lifecycle', function (hooks) {
  setupTooltipperTest(hooks);

  hooks.beforeEach(function () {
    this.tooltipService = this.owner.lookup('service:tooltip');
  });

  test('multiple tooltips can be present at a time', async function (assert) {
    assert.expect(2);

    // Move mouse across all tooltippers
    // The first ones will be animating out as the
    // newer ones are animating in (except for the fact
    // that we delay starting the hide animation for
    // test purposes)

    await render(hbs`
      <div class="t1">1 <Tooltip @hideDelay={{300}}>1</Tooltip></div>
      <div class="t2">2 <Tooltip @hideDelay={{200}}>2</Tooltip></div>
      <div class="t3">3 <Tooltip @hideDelay={{100}}>3</Tooltip></div>
    `);

    triggerEvent('.t1', 'mouseenter');

    await waitUntil(() => findAll('.tooltip').length === 1);

    triggerEvent('.t1', 'mouseleave');
    triggerEvent('.t2', 'mouseenter');

    await waitUntil(() => findAll('.tooltip').length === 2);

    triggerEvent('.t2', 'mouseleave');
    triggerEvent('.t3', 'mouseenter');

    await waitUntil(() => findAll('.tooltip').length === 3);

    assert.strictEqual(this.tooltipService.tooltips.length, 3);

    triggerEvent('.t3', 'mouseleave');

    await waitUntil(() => findAll('.tooltip').length === 2);
    await waitUntil(() => findAll('.tooltip').length === 1);
    await waitUntil(() => findAll('.tooltip').length === 0);

    assert.strictEqual(this.tooltipService.tooltips.length, 0);
  });
});
