import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, triggerEvent } from '@ember/test-helpers';
import { on } from '@ember/modifier';
import Tooltip from '#src/components/tooltip';

module('tooltip | css anchor', function (hooks) {
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
});
