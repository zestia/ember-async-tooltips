import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { later } from '@ember/runloop';

module('tooltip | lazy loading', function (hooks) {
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
          @eager={{false}}
          @showDelay={{100}}
        />
      </div>
    `);

    assert.dom('.tooltip').doesNotExist();

    this.startTimer();

    await triggerEvent('.tooltipper', 'mouseenter');

    this.stopTimer();

    assert.dom('.tooltip').exists();

    this.delayed = this.timeTaken() >= 150 && this.timeTaken() <= 200;

    assert.ok(this.delayed);
  });

  test('load time is more than the show delay', async function (assert) {
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
          @eager={{false}}
          @showDelay={{100}}
        />
      </div>
    `);

    assert.dom('.tooltip').doesNotExist();

    this.startTimer();

    await triggerEvent('.tooltipper', 'mouseenter');

    this.stopTimer();

    assert.dom('.tooltip').exists();

    this.delayed = this.timeTaken() >= 1100 && this.timeTaken() <= 1200;

    assert.ok(this.delayed);

    await triggerEvent('.tooltipper', 'mouseleave');

    this.startTimer();

    await triggerEvent('.tooltipper', 'mouseenter');

    this.stopTimer();

    this.delayed = this.timeTaken() >= 100 && this.timeTaken() <= 150;

    assert.ok(this.delayed);
  });
});
