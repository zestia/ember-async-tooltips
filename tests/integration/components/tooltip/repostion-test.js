import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, find, settled, triggerEvent } from '@ember/test-helpers';
import { waitForFrame } from '@zestia/animation-utils';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | reposition', function (hooks) {
  setupTooltipperTest(hooks);

  hooks.beforeEach(function () {
    this.tooltipService = this.owner.lookup('service:tooltip');
  });

  test('reposition', async function (assert) {
    assert.expect(4);

    this.text = 'Hello';

    await render(hbs`
      <div>
        <Tooltip @position="bottom center">
          {{this.text}}
        </Tooltip>
      </div>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    // Note we don't use .hasStyle due to differences across browsers
    // and so we can round the numbers

    this.style = getComputedStyle(find('.tooltip'));

    // Initial position
    assert.strictEqual(parseInt(this.style.left, 10), -4);
    assert.strictEqual(parseInt(this.style.top, 10), 11);

    this.set('text', 'Hello World');

    await settled();
    await waitForFrame();

    this.style = getComputedStyle(find('.tooltip'));

    // Tooltip has grown, and so its position is re-computed
    assert.strictEqual(parseInt(this.style.left, 10), -15);
    assert.strictEqual(parseInt(this.style.top, 10), 11);
  });
});
