import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, find, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | attach to', function (hooks) {
  setupTooltipperTest(hooks);

  test('display tooltip on mouse over tooltipper, but position it next to another element', async function (assert) {
    assert.expect(5);

    this.attachTo = '#one';

    await render(hbs`
      <div class="parent">
        Hover over me

        <div id="one">
          one
        </div>

        <div id="two">
          two
        </div>

        <Tooltip @attachTo={{this.attachTo}} @position="bottom center" />
      </div>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.parent > .tooltip').exists();

    // Note we don't use .hasStyle due to differences across browsers
    // and so we can round the numbers

    this.style = getComputedStyle(find('.tooltip'));

    assert.strictEqual(parseInt(this.style.left, 10), 37);
    assert.strictEqual(parseInt(this.style.top, 10), 33);

    this.set('attachTo', '#two');

    this.style = getComputedStyle(find('.tooltip'));

    assert.strictEqual(parseInt(this.style.left, 10), 37);
    assert.strictEqual(parseInt(this.style.top, 10), 42);
  });
});
