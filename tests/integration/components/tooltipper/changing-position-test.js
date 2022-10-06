import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, find, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('changing position', async function (assert) {
    assert.expect(6);

    this.position = 'top center';

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "tooltip" text="See me"}}
        @position={{this.position}}
      >
        Hover over me
      </Tooltipper>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert
      .dom('.tooltip')
      .hasAttribute(
        'data-position',
        'top-center',
        'has initial position class name'
      );

    // Note we don't use .hasStyle due to differences across browsers

    const style = getComputedStyle(find('.tooltip'));

    // Initial position

    assert.strictEqual(parseInt(style.left, 10), 16);
    assert.strictEqual(parseInt(style.top, 10), -6);

    this.set('position', 'bottom center');

    assert
      .dom('.tooltip')
      .hasAttribute(
        'data-position',
        'bottom-center',
        'position attribute is recomputed'
      );

    // Tooltip is repositioned

    assert.strictEqual(parseInt(style.left, 10), 16);
    assert.strictEqual(parseInt(style.top, 10), 14);
  });
});
