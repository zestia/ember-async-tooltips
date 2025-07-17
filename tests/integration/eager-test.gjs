import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, waitUntil, triggerEvent } from '@ember/test-helpers';
import { Timer, wait, hasText } from '../helpers';
import Tooltip from '@zestia/ember-async-tooltips/components/tooltip';

module('tooltip | eager loading', function (hooks) {
  setupRenderingTest(hooks);

  const total = 2000;
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
          <Tooltip @onLoad={{load}} @showDelay={{2000}} as |tooltip|>
            {{tooltip.data.greeting}}
          </Tooltip>
        </div>
      </template>
    );

    const timer = new Timer();

    timer.start();

    triggerEvent('.tooltipper', 'mouseenter');

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
          hello
          <Tooltip @onLoad={{load}} @showDelay={{1000}} as |tooltip|>
            {{tooltip.data.greeting}}
          </Tooltip>
        </div>
      </template>
    );

    const timer = new Timer();

    timer.start();

    triggerEvent('.tooltipper', 'mouseenter');

    await waitUntil(() => hasText('.tooltip', 'Hello World'), { timeout });

    timer.stop();

    timer.assertBetween(total, timeout);

    await settled();
  });
});
