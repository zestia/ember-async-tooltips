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
      <style>
        #one,
        #two {
          width: 100px;
          height: 20px;
          border: 1px solid blue;
        }

        .tooltip {
          width: 50px;
          height: 20px;
        }
      </style>

      <div class="parent">
        <div id="one"></div>
        <div id="two"></div>

        <Tooltip @attachTo={{this.attachTo}} @position="bottom center" />
      </div>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.parent > .tooltip').exists();

    this.assertPosition('.tooltip', { left: 27, top: 25 });

    this.set('attachTo', '#two');

    this.assertPosition('.tooltip', { left: 27, top: 36 });
  });
});
