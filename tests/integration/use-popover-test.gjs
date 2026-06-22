import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, settled, triggerEvent } from '@ember/test-helpers';
import { on } from '@ember/modifier';
import Tooltip from '#src/components/tooltip';

module('tooltip | use popover', function (hooks) {
  setupRenderingTest(hooks);

  test('uses the tooltipper as the popover source', async function (assert) {
    assert.expect(6);

    let popoverSource;

    const handleToggle = (event) => {
      popoverSource = event.source;
    };

    await render(
      <template>
        <div>
          <Tooltip @usePopover={{true}} {{on "toggle" handleToggle}} />
        </div>
      </template>
    );

    const tooltipper = find('.tooltipper');

    await triggerEvent(tooltipper, 'mouseenter');

    const tooltip = find('.tooltip');

    assert.strictEqual(
      popoverSource,
      tooltipper,
      'tooltip is coupled to the tooltipper to get css anchor scoped positioning for free'
    );

    assert.true(tooltip.matches(':popover-open'));
    assert.dom('.tooltipper').doesNotHaveAttribute('popovertarget');
    assert
      .dom(tooltip)
      .hasAttribute('popover', 'manual')
      .doesNotHaveAttribute('style')
      .doesNotHaveAttribute('data-position');
  });

  test('sets the side of the tooltipper that the popover is anchored to', async function (assert) {
    assert.expect(4);

    await render(
      <template>
        <div>
          <Tooltip @usePopover={{true}} />
        </div>
      </template>
    );

    const tooltipper = find('.tooltipper');

    tooltipper.getBoundingClientRect = () => ({
      left: 100,
      top: 100,
      width: 20,
      height: 20
    });

    await triggerEvent(tooltipper, 'mouseenter');

    const tooltip = find('.tooltip');

    let tooltipRect;

    tooltip.getBoundingClientRect = () => tooltipRect;

    const assertSide = async (rect, side) => {
      tooltipRect = rect;

      await new Promise((resolve) => requestAnimationFrame(resolve));
      await settled();

      assert.dom(tooltip).hasAttribute('data-side', side);
    };

    await assertSide({ left: 100, top: 140, width: 20, height: 20 }, 'bottom');
    await assertSide({ left: 100, top: 60, width: 20, height: 20 }, 'top');
    await assertSide({ left: 140, top: 100, width: 20, height: 20 }, 'right');
    await assertSide({ left: 60, top: 100, width: 20, height: 20 }, 'left');
  });
});
