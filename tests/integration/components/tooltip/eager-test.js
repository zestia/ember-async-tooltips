import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, settled, waitUntil, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | eager loading', function (hooks) {
  setupTooltipperTest(hooks);

  test('load time is less than the show delay', async function (assert) {
    assert.expect(2);

    this.load = () => this.resolve({ greeting: 'Hello World' }, 50);

    await render(hbs`
      <div>
        <Tooltip
          @onLoad={{this.load}}
          @showDelay={{100}}
          as |tooltip|
        >
          {{tooltip.data.greeting}}
        </Tooltip>
      </div>
    `);

    this.startTimer();

    triggerEvent('.tooltipper', 'mouseenter');

    await waitUntil(() => this.hasText('.tooltip', 'Hello World'));

    this.stopTimer();

    this.assertTimeBetween(100, 150); // combined show delay and load duration

    this.startTimer();

    await settled();

    this.stopTimer();

    this.assertTimeBetween(300, 350); // animation duration
  });

  test('load time is more than the show delay', async function (assert) {
    assert.expect(2);

    this.load = () => this.resolve({ greeting: 'Hello World' }, 1000);

    await render(hbs`
      <div>
        <Tooltip
          @onLoad={{this.load}}
          @showDelay={{100}}
          as |tooltip|
        >
          {{tooltip.data.greeting}}
        </Tooltip>
      </div>
    `);

    this.startTimer();

    triggerEvent('.tooltipper', 'mouseenter');

    await waitUntil(() => this.hasText('.tooltip', 'Hello World'));

    this.stopTimer();

    this.assertTimeBetween(1000, 1100); // combined show delay and load duration

    await triggerEvent('.tooltipper', 'mouseleave');

    this.startTimer();

    await triggerEvent('.tooltipper', 'mouseenter');

    this.stopTimer();

    this.assertTimeBetween(400, 450); // combined show delay and animation duration (already loaded)
  });
});
