import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import setupTooltipperTest from './setup';
import { render, triggerEvent } from '@ember/test-helpers';

module('tooltip | custom position', function (hooks) {
  setupTooltipperTest(hooks);

  test('can position the tooltip using a function', async function (assert) {
    assert.expect(2);

    this.position = (referencePosition) => {
      this.referencePosition = referencePosition;

      return 'left top';
    };

    await render(hbs`
      <div>
        <Tooltip @position={{this.position}} />
      </div>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.strictEqual(this.referencePosition, 'middle center');

    assert.dom('.tooltip').hasAttribute('data-tooltip-position', 'left top');
  });

  test('no position', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <div>
        <Tooltip @position={{this.position}} />
      </div>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert
      .dom('.tooltip')
      .hasAttribute('data-tooltip-position', 'bottom center');
  });

  test('invalid position', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <div>
        <Tooltip @position="foo" />
      </div>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert
      .dom('.tooltip')
      .hasAttribute('data-tooltip-position', 'foo')
      .hasAttribute('style', 'top: NaNpx; left: NaNpx');
  });
});
