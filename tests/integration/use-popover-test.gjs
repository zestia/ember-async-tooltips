import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, settled, triggerEvent } from '@ember/test-helpers';
import { trackedObject } from '@ember/reactive/collections';
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
      .hasAttribute('data-position', 'none');
  });

  test('exposes the computed position-area for native popovers', async function (assert) {
    assert.expect(3);

    const state = trackedObject({ positionArea: 'bottom-right' });

    await render(
      <template>
        {{! template-lint-disable no-forbidden-elements }}
        <style>
          .bottom-right {
            position-area: bottom span-right;
          }

          .top-left {
            position-area: top span-left;
          }
        </style>

        <div>
          <Tooltip class={{state.positionArea}} @usePopover={{true}} />
        </div>
      </template>
    );

    await triggerEvent('.tooltipper', 'mouseenter');
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await settled();

    assert.dom('.tooltip').hasAttribute('data-position', 'span-right bottom');

    state.positionArea = 'top-left';

    await new Promise((resolve) => requestAnimationFrame(resolve));
    await settled();

    assert.dom('.tooltip').hasAttribute('data-position', 'span-left top');

    state.positionArea = '';

    await new Promise((resolve) => requestAnimationFrame(resolve));
    await settled();

    assert.dom('.tooltip').hasAttribute('data-position', 'none');
  });
});
