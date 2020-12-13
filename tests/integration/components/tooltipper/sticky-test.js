import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, settled, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import waitForAnimation from '../../../helpers/wait-for-animation';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('stickyness', async function (assert) {
    assert.expect(4);

    await render(hbs`
      <Tooltipper @showDelay={{1000}} @stickyID="A" @tooltip={{component "tooltip" text="foo"}} />
      <Tooltipper @showDelay={{1000}} @stickyID="A" @tooltip={{component "tooltip" text="bar"}} />
      <Tooltipper @showDelay={{1000}} @stickyID="B" @tooltip={{component "tooltip" text="baz"}} />
      <Tooltipper @showDelay={{1000}} @stickyID="B" @tooltip={{component "tooltip" text="qux"}} />
    `);

    this.startTimer();

    await triggerEvent('.tooltipper:nth-child(1)', 'mouseenter');

    this.stopTimer();

    assert.ok(this.timeTaken() >= 1000, 'initial show delay acknowledged');

    this.startTimer();

    await triggerEvent('.tooltipper:nth-child(2)', 'mouseenter');

    this.stopTimer();

    assert.ok(this.timeTaken() < 100, 'show delay is ignored when id matches');

    this.startTimer();

    await triggerEvent('.tooltipper:nth-child(3)', 'mouseenter');

    this.stopTimer();

    assert.ok(
      this.timeTaken() >= 1000,
      'show delay is acknowledged if sticky identifier differs'
    );

    this.startTimer();

    await triggerEvent('.tooltipper:nth-child(4)', 'mouseenter');

    this.stopTimer();

    assert.ok(this.timeTaken() < 100, 'show delay is ignored when id matches');
  });
});
