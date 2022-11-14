import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | basic', function (hooks) {
  setupRenderingTest(hooks);

  test('basic rendering test', async function (assert) {
    assert.expect(7);

    await render(hbs`
      <div class="parent"><Tooltip class="example" /></div>
    `);

    assert.dom('.parent').hasClass('tooltipper');
    assert.dom('.tooltipper > span.__tooltip__').isNotVisible();
    assert.dom('.example').doesNotExist();
    assert.dom('.tooltip').doesNotExist();

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltipper > .tooltip').exists();
    assert.dom('.tooltip').hasClass('example');
    assert.dom('.tooltipper').hasText(/^$/);
  });
});
