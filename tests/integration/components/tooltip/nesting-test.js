import { module, test } from 'qunit';
import setupTooltipperTest from 'dummy/tests/integration/components/tooltip/setup';
import { render, settled, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | nesting', function (hooks) {
  setupTooltipperTest(hooks);

  hooks.beforeEach(async function () {
    await render(hbs`
      <div class="parent">
        <Tooltip @showDelay={{this.parentDelay}}>
          Parent
        </Tooltip>

        <div class="child">
          <Tooltip>
            Child
          </Tooltip>
        </div>
      </div>
    `);
  });

  test('entering a child with a delayed parent aborts the parent', async function (assert) {
    assert.expect(2);

    this.set('parentDelay', 1000);

    triggerEvent('.parent', 'mouseenter', { bubbles: false });
    triggerEvent('.child', 'mouseenter', { bubbles: false });

    await settled();

    assert.dom('.tooltip').exists({ count: 1 }).hasText('Child');
  });

  test('entering a child with an already rendered parent hides the parent', async function (assert) {
    assert.expect(4);

    await triggerEvent('.parent', 'mouseenter', { bubbles: false });

    assert.dom('.tooltip').exists({ count: 1 }).hasText('Parent');

    await triggerEvent('.child', 'mouseenter', { bubbles: false });

    assert.dom('.tooltip').exists({ count: 1 }).hasText('Child');
  });
});
