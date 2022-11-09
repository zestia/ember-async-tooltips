import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, waitFor, triggerEvent, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { later } from '@ember/runloop';

module('tooltip | delays', function (hooks) {
  setupTooltipperTest(hooks);

  test('load time is less than the show delay', async function (assert) {
    assert.expect(3);

    this.load = () => {
      return new Promise((resolve) => {
        later(resolve, 50);
      });
    };

    await render(hbs`
      <style>
        .tooltip { animation: none !important }
      </style>

      <div>
        <Tooltip
          @onLoad={{this.load}}
          @showDelay={{100}}
        />
      </div>
    `);

    assert.dom('.tooltip').doesNotExist();

    this.startTimer();

    await triggerEvent('.tooltipper', 'mouseenter');

    this.stopTimer();

    assert.dom('.tooltip').exists();

    this.delayed = this.timeTaken() >= 100 && this.timeTaken() <= 150;

    assert.ok(this.delayed);
  });

  test('load delay more than show delay', async function (assert) {
    assert.expect(4);

    this.load = () => {
      return new Promise((resolve) => {
        later(resolve, 1000);
      });
    };

    await render(hbs`
    <style>
      .tooltip { animation: none !important }
    </style>

      <div>
        <Tooltip
          @onLoad={{this.load}}
          @showDelay={{100}}
        />
      </div>
    `);

    assert.dom('.tooltip').doesNotExist();

    this.startTimer();

    await triggerEvent('.tooltipper', 'mouseenter');

    this.stopTimer();

    assert.dom('.tooltip').exists();

    this.delayed = this.timeTaken() >= 1000 && this.timeTaken() <= 1100;

    assert.ok(this.delayed);

    await triggerEvent('.tooltipper', 'mouseleave');

    this.startTimer();

    await triggerEvent('.tooltipper', 'mouseenter');

    this.stopTimer();

    this.delayed = this.timeTaken() >= 100 && this.timeTaken() <= 150;

    assert.ok(this.delayed);
  });

  test('hide delay', async function (assert) {
    assert.expect(4);

    await render(hbs`
      <div>
        <Tooltip @hideDelay={{100}} />
      </div>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltip').hasAttribute('data-tooltip-showing', 'true');

    this.startTimer();

    triggerEvent('.tooltipper', 'mouseleave');

    await waitFor(".tooltip[data-tooltip-showing='false']");

    this.stopTimer();

    this.delayed = this.timeTaken() >= 100 && this.timeTaken() <= 150;

    assert.ok(this.delayed);

    assert.dom('.tooltip').exists();

    await settled();

    assert.dom('.tooltip').doesNotExist();
  });
});
