import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | destination', function (hooks) {
  setupTooltipperTest(hooks);

  test('can specify an output destination', async function (assert) {
    assert.expect(3);

    this.register = (element) => this.set('elsewhere', element);

    await render(hbs`
      <div class="parent">
        <Tooltip @destination={{this.elsewhere}} />
      </div>

      <div class="elsewhere" {{did-insert this.register}}></div>
    `);

    await triggerEvent('div', 'mouseenter');

    assert.dom('.tooltipper > .__tooltip__').exists();
    assert.dom('.parent > .tooltip').doesNotExist();
    assert.dom('.elsewhere > .tooltip').exists();
  });
});
