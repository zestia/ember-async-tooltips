import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, triggerEvent, find } from '@ember/test-helpers';
import Tooltip from '#src/components/tooltip';

const moveMouseInsideTooltipper = async (tooltipper, x, y) => {
  const tooltipperRect = tooltipper.getBoundingClientRect();

  const tooltipperCenterX = tooltipperRect.left + tooltipperRect.width / 2;
  const tooltipperCenterY = tooltipperRect.top + tooltipperRect.height / 2;

  await triggerEvent(tooltipper, 'mousemove', {
    clientX: tooltipperCenterX + x,
    clientY: tooltipperCenterY + y
  });
};

module('tooltip | follow mouse', function (hooks) {
  setupRenderingTest(hooks);

  test('@followMouse does not work if @useClick is enabled', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <div class="tooltipper">
          <Tooltip
            @followMouse={{true}}
            @usePopover={{true}}
            @useClick={{true}}
          />
        </div>
      </template>
    );

    await click('.tooltipper');

    const tooltip = find('.tooltip');

    assert.ok(tooltip, 'it renders the tooltip');

    const prevPos = tooltip.getBoundingClientRect();

    await triggerEvent('.tooltipper', 'mousemove', { clientX: 10, clientY: 0 });

    assert.deepEqual(
      prevPos,
      tooltip.getBoundingClientRect(),
      'it does not move the tooltip when the mouse moves'
    );
  });

  test('@followMouse does nothing if @usePopover is not enabled', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <div class="tooltipper">
          <Tooltip @followMouse={{true}} @usePopover={{false}} />
        </div>
      </template>
    );

    const tooltipper = find('.tooltipper');
    const tooltipperRect = tooltipper.getBoundingClientRect();

    await triggerEvent(tooltipper, 'mouseenter');

    await triggerEvent(tooltipper, 'mousemove', {
      clientX: tooltipperRect.left,
      clientY: tooltipperRect.top
    });

    const tooltip = find('.tooltip');

    assert.ok(tooltip, 'it renders the tooltip');

    const prevPos = tooltip.getBoundingClientRect();

    await triggerEvent(tooltipper, 'mousemove', {
      clientX: tooltipperRect.left + 5,
      clientY: tooltipperRect.top + 5
    });

    assert.deepEqual(
      prevPos,
      tooltip.getBoundingClientRect(),
      'it does not move the tooltip when the mouse moves'
    );
  });

  test('@followMouse moves tooltip along the axis it is positioned (bottom)', async function (assert) {
    await render(
      <template>
        {{! template-lint-disable no-forbidden-elements }}
        <style>
          .tooltipper {
            position: absolute;
            top: 50%;
            left: 50%;
          }

          .tooltip {
            position-area: bottom;
          }
        </style>
        <div>
          Popover target
          <Tooltip @usePopover={{true}} @followMouse={{true}}>
            Tooltip
          </Tooltip>
        </div>
      </template>
    );

    const tooltipper = find('.tooltipper');
    const tooltipperRect = tooltipper.getBoundingClientRect();

    await triggerEvent(tooltipper, 'mouseenter');

    await triggerEvent(tooltipper, 'mousemove', {
      clientX: tooltipperRect.left,
      clientY: tooltipperRect.top
    });

    assert.dom('.tooltip').hasAttribute('data-side', 'bottom');

    const prevRect = find('.tooltip').getBoundingClientRect();

    await triggerEvent(tooltipper, 'mousemove', {
      clientX: tooltipperRect.left + 5,
      clientY: tooltipperRect.top + 5
    });

    const currentRect = find('.tooltip').getBoundingClientRect();

    assert.true(
      currentRect.x > prevRect.x,
      'tooltip has moved right on X axis'
    );

    assert.strictEqual(
      currentRect.y,
      prevRect.y,
      'tooltip has not moved at all on the Y axis'
    );
  });

  test('@followMouse moves tooltip along the axis it is positioned (top)', async function (assert) {
    await render(
      <template>
        {{! template-lint-disable no-forbidden-elements }}
        <style>
          .tooltipper {
            position: absolute;
            top: 50%;
            left: 50%;
          }

          .tooltip {
            position-area: top;
          }
        </style>
        <div>
          Popover target
          <Tooltip @usePopover={{true}} @followMouse={{true}}>
            Tooltip
          </Tooltip>
        </div>
      </template>
    );

    const tooltipper = find('.tooltipper');
    const tooltipperRect = tooltipper.getBoundingClientRect();

    await triggerEvent(tooltipper, 'mouseenter');

    await triggerEvent(tooltipper, 'mousemove', {
      clientX: tooltipperRect.left,
      clientY: tooltipperRect.top
    });

    assert.dom('.tooltip').hasAttribute('data-side', 'top');

    const prevRect = find('.tooltip').getBoundingClientRect();

    await triggerEvent(tooltipper, 'mousemove', {
      clientX: tooltipperRect.left + 5,
      clientY: tooltipperRect.top + 5
    });

    const currentRect = find('.tooltip').getBoundingClientRect();

    assert.true(
      currentRect.x > prevRect.x,
      'tooltip has moved right on X axis'
    );

    assert.strictEqual(
      currentRect.y,
      prevRect.y,
      'tooltip has not moved at all on the Y axis'
    );
  });

  test('@followMouse moves tooltip along the axis it is positioned (left)', async function (assert) {
    await render(
      <template>
        {{! template-lint-disable no-forbidden-elements }}
        <style>
          .tooltipper {
            position: absolute;
            top: 50%;
            left: 100%;
          }

          .tooltip {
            position-area: left;
          }
        </style>
        <div>
          Popover target
          <Tooltip @usePopover={{true}} @followMouse={{true}}>
            Tooltip
          </Tooltip>
        </div>
      </template>
    );

    const tooltipper = find('.tooltipper');
    const tooltipperRect = tooltipper.getBoundingClientRect();

    await triggerEvent(tooltipper, 'mouseenter');

    await triggerEvent(tooltipper, 'mousemove', {
      clientX: tooltipperRect.left,
      clientY: tooltipperRect.top
    });

    assert.dom('.tooltip').hasAttribute('data-side', 'left');

    const prevRect = find('.tooltip').getBoundingClientRect();

    await triggerEvent(tooltipper, 'mousemove', {
      clientX: tooltipperRect.left + 5,
      clientY: tooltipperRect.top + 5
    });

    const currentRect = find('.tooltip').getBoundingClientRect();

    assert.true(
      currentRect.y > prevRect.y,
      'tooltip has moved down on the Y axis'
    );

    assert.strictEqual(
      currentRect.x,
      prevRect.x,
      'tooltip has not moved at all on the X axis'
    );
  });

  test('@followMouse moves tooltip along the axis it is positioned (right)', async function (assert) {
    await render(
      <template>
        {{! template-lint-disable no-forbidden-elements }}
        <style>
          .tooltipper {
            position: absolute;
            top: 50%;
            left: 0;
          }

          .tooltip {
            position-area: right;
          }
        </style>
        <div>
          Popover target
          <Tooltip @usePopover={{true}} @followMouse={{true}}>
            Tooltip
          </Tooltip>
        </div>
      </template>
    );

    const tooltipper = find('.tooltipper');
    const tooltipperRect = tooltipper.getBoundingClientRect();

    await triggerEvent(tooltipper, 'mouseenter');

    await triggerEvent(tooltipper, 'mousemove', {
      clientX: tooltipperRect.left,
      clientY: tooltipperRect.top
    });

    assert.dom('.tooltip').hasAttribute('data-side', 'right');

    const prevRect = find('.tooltip').getBoundingClientRect();

    await triggerEvent(tooltipper, 'mousemove', {
      clientX: tooltipperRect.left + 5,
      clientY: tooltipperRect.top + 5
    });

    const currentRect = find('.tooltip').getBoundingClientRect();

    assert.true(
      currentRect.y > prevRect.y,
      'tooltip has moved down on the Y axis'
    );

    assert.strictEqual(
      currentRect.x,
      prevRect.x,
      'tooltip has not moved at all on the X axis'
    );
  });

  test('it does not move the tooltip if cursor is inside of the tooltip whilst moving', async function (assert) {
    await render(
      <template>
        {{! template-lint-disable no-forbidden-elements }}
        <style>
          .tooltipper {
            position: absolute;
            top: 50%;
            left: 50%;
          }

          .tooltip {
            position-area: right;
          }
        </style>
        <div>
          Popover target
          <Tooltip @usePopover={{true}} @followMouse={{true}}>
            Tooltip
          </Tooltip>
        </div>
      </template>
    );

    const tooltipper = find('.tooltipper');
    const tooltipperRect = tooltipper.getBoundingClientRect();

    await triggerEvent(tooltipper, 'mouseenter');

    await triggerEvent(tooltipper, 'mousemove', {
      clientX: tooltipperRect.left,
      clientY: tooltipperRect.top
    });

    assert.dom('.tooltip').hasAttribute('data-side', 'right');

    const tooltip = find('.tooltip');

    const tooltipRect = tooltip.getBoundingClientRect();

    // Note event trigger with the tooltip as the target, not the tooltipper. To simulate the mouse being inside of the tooltip
    await triggerEvent(tooltip, 'mousemove', {
      clientX: tooltipperRect.left + 5,
      clientY: tooltipperRect.top + 5
    });

    const tooltipRectAfterMove = tooltip.getBoundingClientRect();

    assert.strictEqual(
      tooltipRect.y,
      tooltipRectAfterMove.y,
      'tooltip has not moved at all on the y despite mouse movement, as we block this from happening if mousemove event target is inside of/or the tooltip itself'
    );
  });
});
