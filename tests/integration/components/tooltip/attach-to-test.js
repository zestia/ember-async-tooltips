import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent } from '@ember/test-helpers';
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

    this.assertPosition('.tooltip', { left: 37, top: 33 });

    this.set('attachTo', '#two');

    this.assertPosition('.tooltip', { left: 37, top: 42 });
  });
});
