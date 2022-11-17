import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, settled, triggerEvent } from '@ember/test-helpers';
import { waitForFrame } from '@zestia/animation-utils';
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

    this.assertPosition('.tooltip', { left: -4, top: 11 });

    this.set('text', 'Hello World');

    await settled();
    await waitForFrame();

    this.assertPosition('.tooltip', { left: -15, top: 11 });
  });

  test('tethering is stopped when tooltop is torn down', async function (assert) {
    assert.expect(3);

    this.show = true;

    await render(hbs`
      {{#if this.show}}
        <div>
          Hover over me

          <Tooltip @position="bottom center">
            Hello World
          </Tooltip>
        </div>
      {{/if}}
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    const tooltip = this.tooltipService.tooltips[0];
    const frameStart = tooltip.tetherID;

    this.set('show', false);

    await settled();
    await waitForFrame();

    const frameEnd = tooltip.tetherID;

    assert.ok(frameStart > 0);
    assert.ok(frameEnd > 0);
    assert.strictEqual(frameStart, frameEnd);
  });
});
