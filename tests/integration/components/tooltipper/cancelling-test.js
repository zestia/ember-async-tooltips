import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent, settled } from '@ember/test-helpers';
import { later } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('cancelling showing', async function (assert) {
    assert.expect(1);

    this.mouseEvents = true;

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "tooltip"}}
        @showDelay={{1000}}
        @mouseEvents={{this.mouseEvents}}
        as |tooltipper|
      >
        Hover over me
      </Tooltipper>
    `);

    triggerEvent('.tooltipper', 'mouseenter'); // Intentionally no await

    await new Promise((resolve) => later(resolve), 500);

    this.set('mouseEvents', false);

    await settled();

    assert
      .dom('.tooltip')
      .doesNotExist('tooltips scheduled to show, will be cancelled');
  });
});
