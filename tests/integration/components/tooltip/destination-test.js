import { module, test } from 'qunit';
import setupTooltipperTest from 'dummy/tests/integration/components/tooltip/setup';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | destination', function (hooks) {
  setupTooltipperTest(hooks);

  test('can specify an output destination', async function (assert) {
    assert.expect(3);

    this.register = (element) => this.set('elsewhere', element);

    await render(hbs`
      <div>
        <Tooltip @destination={{this.elsewhere}} />
      </div>

      <div class="elsewhere" {{did-insert this.register}}></div>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltipper > .__tooltip__').exists();
    assert.dom('.tooltipper > .tooltip').doesNotExist();
    assert.dom('.elsewhere > .tooltip').exists();
  });
});
