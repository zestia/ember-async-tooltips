import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent } from '@ember/test-helpers';
import { later } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('cancelling showing', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <Tooltipper @Tooltip={{component "tooltip"}} @showDelay={{1000}} as |tooltipper|>
        <button {{on "click" tooltipper.cancelShowTooltip}}>
          Hover over me
        </button>
      </Tooltipper>
    `);

    triggerEvent('.tooltipper', 'mouseenter'); // Intentionally no await

    await new Promise((resolve) => later(resolve), 500);

    await triggerEvent('button', 'click');

    assert.dom('.tooltip').doesNotExist('can cancel showing a tooltip');
  });
});
