import { module, test } from 'qunit';
import setupTooltipperTest from 'dummy/tests/integration/components/tooltip/setup';
import { render, settled, waitUntil, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | lazy loading', function (hooks) {
  setupTooltipperTest(hooks);

  test('load time is less than the show delay', async function (assert) {
    assert.expect(2);

    this.load = () => this.resolve({ greeting: 'Hello World' }, 50);

    await render(hbs`
      <div>
        <Tooltip
          @onLoad={{this.load}}
          @eager={{false}}
          @showDelay={{100}}
          as |tooltip|
        >
          {{#if tooltip.data}}
            {{tooltip.data.greeting}}
          {{else}}
            Loading...
          {{/if}}
        </Tooltip>
      </div>
    `);

    this.startTimer();

    triggerEvent('.tooltipper', 'mouseenter');

    await waitUntil(() => this.hasText('.tooltip', 'Loading...'));
    await waitUntil(() => this.hasText('.tooltip', 'Hello World'));

    this.stopTimer();

    this.assertTimeBetween(150, 200); // combined show delay and load duration

    this.startTimer();

    await settled();

    this.stopTimer();

    this.assertTimeBetween(250, 300); // animation duration
  });

  test('load time is more than the show delay', async function (assert) {
    assert.expect(2);

    this.load = () => this.resolve({ greeting: 'Hello World' }, 1000);

    await render(hbs`
      <div>
        <Tooltip
          @onLoad={{this.load}}
          @eager={{false}}
          @showDelay={{100}}
          as |tooltip|
        >
          {{#if tooltip.data}}
            {{tooltip.data.greeting}}
          {{else}}
            Loading...
          {{/if}}
        </Tooltip>
      </div>
    `);

    this.startTimer();

    triggerEvent('.tooltipper', 'mouseenter');

    await waitUntil(() => this.hasText('.tooltip', 'Loading...'));
    await waitUntil(() => this.hasText('.tooltip', 'Hello World'));

    this.stopTimer();

    this.assertTimeBetween(1100, 1200); // combined show delay and load duration

    await triggerEvent('.tooltipper', 'mouseleave');

    this.startTimer();

    await triggerEvent('.tooltipper', 'mouseenter');

    this.stopTimer();

    this.assertTimeBetween(400, 450); // combined show delay and animation duration
  });
});
