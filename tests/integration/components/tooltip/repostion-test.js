import { module, test } from 'qunit';
import setupTooltipperTest from 'dummy/tests/integration/components/tooltip/setup';
import { waitUntil, render, settled, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | reposition', function (hooks) {
  setupTooltipperTest(hooks);

  hooks.beforeEach(function () {
    this.tooltipService = this.owner.lookup('service:tooltip');
  });

  test('reposition', async function (assert) {
    assert.expect(4);

    this.text = 'Hello';

    await render(hbs`
      <div>
        <Tooltip @position="bottom center">
          {{this.text}}
        </Tooltip>
      </div>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    const expectedStartPosition = { left: -4, top: 11 };
    const expectedEndPosition = { left: -15, top: 11 };

    this.assertPosition('.tooltip', expectedStartPosition);

    this.set('text', 'Hello World');

    await waitUntil(() => {
      return this.getPosition('.tooltip').left !== expectedStartPosition.left;
    });

    this.assertPosition('.tooltip', expectedEndPosition);
  });

  test('tethering is stopped when tooltip is torn down', async function (assert) {
    assert.expect(3);

    this.show = true;

    await render(hbs`
      {{#if this.show}}
        <div>
          <Tooltip @position="bottom center" />
        </div>
      {{/if}}
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    const tooltip = this.tooltipService.tooltips[0];
    const frameStart = tooltip.tetherID;

    this.set('show', false);

    await settled();

    const frameEnd = tooltip.tetherID;

    assert.ok(frameStart > 0);
    assert.ok(frameEnd > 0);
    assert.strictEqual(frameStart, frameEnd);
  });
});
