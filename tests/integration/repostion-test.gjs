import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, waitUntil, triggerEvent } from '@ember/test-helpers';
import { trackedObject } from '@ember/reactive/collections';
import { assertPosition, getPosition } from '#tests/helpers';
import Tooltip from '#src/components/tooltip';

module('tooltip | reposition', function (hooks) {
  setupRenderingTest(hooks);

  test('reposition', async function (assert) {
    assert.expect(4);

    const state = trackedObject({ text: 'Hello' });

    await render(
      <template>
        <div>
          <Tooltip @position="bottom center">
            {{state.text}}
          </Tooltip>
        </div>
      </template>
    );

    await triggerEvent('.tooltipper', 'mouseenter');

    const expectedStartPosition = { left: -4, top: 11 };
    const expectedEndPosition = { left: -15, top: 11 };

    assertPosition('.tooltip', expectedStartPosition);

    state.text = 'Hello World';

    await waitUntil(() => {
      return getPosition('.tooltip').left !== expectedStartPosition.left;
    });

    assertPosition('.tooltip', expectedEndPosition);
  });

  test('tethering is stopped when tooltip is torn down', async function (assert) {
    assert.expect(3);

    const tooltipService = this.owner.lookup('service:tooltip');

    const state = trackedObject({ show: true });

    await render(
      <template>
        {{#if state.show}}
          <div>
            <Tooltip @position="bottom center" />
          </div>
        {{/if}}
      </template>
    );

    await triggerEvent('.tooltipper', 'mouseenter');

    const tooltip = tooltipService.tooltips[0];
    const frameStart = tooltip.tetherID;

    state.show = false;

    await settled();

    const frameEnd = tooltip.tetherID;

    assert.ok(frameStart > 0);
    assert.ok(frameEnd > 0);
    assert.strictEqual(frameStart, frameEnd);
  });
});
