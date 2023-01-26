import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | no animation', function (hooks) {
  setupTooltipperTest(hooks);

  test('show/hide actions still fire when no animation', async function (assert) {
    assert.expect(6);

    this.handleShow = () => assert.step('show');
    this.handleHide = () => assert.step('hide');

    await render(hbs`
      {{! template-lint-disable no-forbidden-elements }}
      <style>
      .tooltip { animation: none !important }
      </style>

      <div>
        <Tooltip
          @onShow={{this.handleShow}}
          @onHide={{this.handleHide}}
        />
      </div>
    `);

    assert.dom('.tooltip').doesNotExist();

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltip').exists();

    await triggerEvent('.tooltipper', 'mouseleave');

    assert.dom('.tooltip').doesNotExist();

    assert.verifySteps(['show', 'hide']);
  });
});
