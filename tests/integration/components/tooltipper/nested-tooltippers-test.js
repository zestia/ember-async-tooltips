import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  hooks.beforeEach(async function () {
    await render(hbs`
      <Tooltipper
        class="outer-tooltipper"
        @Tooltip={{component "tooltip" text="Outer"}}
        @showDelay={{100}}
      >
        <Tooltipper
          class="inner-tooltipper"
          @Tooltip={{component "tooltip" text="Inner"}}
        />
      </Tooltipper>
    `);
  });

  test('parent with already rendered child', async function (assert) {
    assert.expect(2);

    // To enter the child, one must first enter the parent.
    // The parent's tooltip should be aborted to favour the child.
    // (This only works if the parent is configured to display later)

    await triggerEvent('.inner-tooltipper', 'mouseenter');

    assert.dom('.tooltip').exists({ count: 1 }).hasText('Inner');
  });

  test('child with already rendered parent', async function (assert) {
    assert.expect(2);

    // After first hovering over a parent to make its tooltip show,
    // and subsequently hovering over a child. Then the parent's tooltip
    // should be removed to favour the child.

    await triggerEvent('.outer-tooltipper', 'mouseenter');
    await triggerEvent('.inner-tooltipper', 'mouseenter');

    assert.dom('.tooltip').exists({ count: 1 }).hasText('Inner');
  });
});
