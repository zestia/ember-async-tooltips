import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, find, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | attach to', function (hooks) {
  setupTooltipperTest(hooks);

  test('display tooltip on mouse over tooltipper, but position it next to another element', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <div>
        Hover over me

        {{#let (unique-id) as |id|}}
          <small id={{id}}>ⓘ</small>
          <Tooltip @attachTo="#{{id}}" @position="bottom center" />
        {{/let}}
      </div>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    // Note we don't use .hasStyle due to differences across browsers
    // and so we can round the numbers

    this.style = getComputedStyle(find('.tooltip'));

    assert.strictEqual(parseInt(this.style.left, 10), 57);
    assert.strictEqual(parseInt(this.style.top, 10), 13);
  });
});
