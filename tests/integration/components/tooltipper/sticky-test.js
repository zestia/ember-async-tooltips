import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import waitForAnimation from '../../../helpers/wait-for-animation';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('stickyness', async function (assert) {
    assert.expect(4);

    await render(hbs`
      <Tooltipper @Tooltip={{component "tooltip" text="foo"}} @showDelay={{1000}} @stickyID="A" />
      <Tooltipper @Tooltip={{component "tooltip" text="bar"}} @showDelay={{1000}} @stickyID="A" />
      <Tooltipper @Tooltip={{component "tooltip" text="baz"}} @showDelay={{1000}} @stickyID="B" />
      <Tooltipper @Tooltip={{component "tooltip" text="qux"}} @showDelay={{1000}} @stickyID="B" />
    `);

    this.startTimer();

    await triggerEvent('.tooltipper:nth-child(1)', 'mouseenter');
    await waitForAnimation('.tooltipper:nth-child(1) .tooltip');

    this.stopTimer();

    assert.ok(this.timeTaken() >= 1000, 'initial show delay acknowledged');

    this.startTimer();

    await triggerEvent('.tooltipper:nth-child(2)', 'mouseenter');
    await waitForAnimation('.tooltipper:nth-child(2) .tooltip');

    this.stopTimer();

    assert.ok(
      this.timeTaken() < 100,
      'show delay is ignored when sticky identifier matches'
    );

    this.startTimer();

    await triggerEvent('.tooltipper:nth-child(3)', 'mouseenter');
    await waitForAnimation('.tooltipper:nth-child(3) .tooltip');

    this.stopTimer();

    assert.ok(
      this.timeTaken() >= 1000,
      'show delay is acknowledged if sticky identifier differs'
    );

    this.startTimer();

    await triggerEvent('.tooltipper:nth-child(4)', 'mouseenter');
    await waitForAnimation('.tooltipper:nth-child(4) .tooltip');

    this.stopTimer();

    assert.ok(
      this.timeTaken() < 100,
      'show delay is ignored when sticky identifier matches'
    );
  });
});
