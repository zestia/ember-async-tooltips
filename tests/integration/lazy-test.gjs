import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, waitUntil, triggerEvent } from '@ember/test-helpers';
import { Timer, wait, hasText } from '../helpers';
import Tooltip from '@zestia/ember-async-tooltips/components/tooltip';

module('tooltip | lazy loading', function (hooks) {
  setupRenderingTest(hooks);

  const total = 3000;
  const leeway = 150;
  const timeout = total + leeway;

  test('load time is less than the show delay', async function (assert) {
    assert.expect(1);

    const load = async () => {
      await wait(1000);
      return { greeting: 'Hello World' };
    };

    await render(
      <template>
        <div>
          <Tooltip
            @onLoad={{load}}
            @eager={{false}}
            @showDelay={{2000}}
            as |tooltip|
          >
            {{#if tooltip.isLoading}}
              Loading...
            {{else}}
              {{tooltip.data.greeting}}
            {{/if}}
          </Tooltip>
        </div>
      </template>
    );

    const timer = new Timer();

    timer.start();

    triggerEvent('.tooltipper', 'mouseenter');

    await waitUntil(() => hasText('.tooltip', 'Loading...'), { timeout });
    await waitUntil(() => hasText('.tooltip', 'Hello World'), { timeout });

    timer.stop();

    timer.assertBetween(total, timeout);

    await settled();
  });

  test('load time is more than the show delay', async function (assert) {
    assert.expect(1);

    const load = async () => {
      await wait(2000);
      return { greeting: 'Hello World' };
    };

    await render(
      <template>
        <div>
          <Tooltip
            @onLoad={{load}}
            @eager={{false}}
            @showDelay={{1000}}
            as |tooltip|
          >
            {{#if tooltip.isLoading}}
              Loading...
            {{else}}
              {{tooltip.data.greeting}}
            {{/if}}
          </Tooltip>
        </div>
      </template>
    );

    const timer = new Timer();

    timer.start();

    triggerEvent('.tooltipper', 'mouseenter');

    await waitUntil(() => hasText('.tooltip', 'Loading...'), { timeout });
    await waitUntil(() => hasText('.tooltip', 'Hello World'), { timeout });

    timer.stop();

    timer.assertBetween(total, timeout);

    await settled();
  });
});
