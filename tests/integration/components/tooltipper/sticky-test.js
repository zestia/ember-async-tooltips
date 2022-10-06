import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, waitFor, settled, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('stickyness', async function (assert) {
    assert.expect(7);

    await render(hbs`
      <Tooltipper class="a1" @Tooltip={{component "tooltip" text="A1"}} @showDelay={{1000}} @stickyID="A" />
      <Tooltipper class="a2" @Tooltip={{component "tooltip" text="A2"}} @showDelay={{1000}} @stickyID="A" />
      <Tooltipper class="b1" @Tooltip={{component "tooltip" text="B1"}} @showDelay={{1000}} @stickyID="B" />
      <Tooltipper class="b2" @Tooltip={{component "tooltip" text="B2"}} @showDelay={{1000}} @stickyID="B" />
    `);

    // A1

    this.startTimer();

    triggerEvent('.a1', 'mouseenter');

    await waitFor('.a1 .tooltip');

    assert
      .dom('.a1 .tooltip')
      .hasAttribute(
        'data-sticky',
        'false',
        'initial tooltip is not sticky, yet'
      );

    this.stopTimer();

    assert.ok(this.timeTaken() >= 1000, 'initial show delay acknowledged');

    await settled();

    assert
      .dom('.a1 .tooltip')
      .hasAttribute(
        'data-sticky',
        'true',
        'tooltip is considered sticky after animating in'
      );

    // A2

    this.startTimer();

    await triggerEvent('.a2', 'mouseenter');

    assert
      .dom('.a2 .tooltip')
      .hasAttribute(
        'data-sticky',
        'true',
        'subsequent tooltip is considered sticky'
      );

    this.stopTimer();

    assert.ok(
      this.timeTaken() < 1000,
      'show delay is ignored when sticky identifier matches'
    );

    // B1

    this.startTimer();

    await triggerEvent('.b1', 'mouseenter');

    this.stopTimer();

    assert.ok(
      this.timeTaken() >= 1000,
      'show delay is acknowledged when sticky identifier differs'
    );

    // B2

    this.startTimer();

    await triggerEvent('.b2', 'mouseenter');

    this.stopTimer();

    assert.ok(
      this.timeTaken() < 1000,
      'show delay is ignored when sticky identifier matches'
    );
  });
});
