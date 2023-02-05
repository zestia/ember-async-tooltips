import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
const { keys, isFrozen } = Object;

module('tooltip | api', function (hooks) {
  setupRenderingTest(hooks);

  test('api rendering test', async function (assert) {
    assert.expect(7);

    this.capture = (api) => (this.api = api);
    this.load = () => 'foo';

    await render(hbs`
      <div>
        <Tooltip
          @onLoad={{this.load}}
          as |tooltip|
        >
          {{this.capture tooltip}}
        </Tooltip>
      </div>
    `);

    assert.dom('.tooltip').doesNotExist();

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.deepEqual(keys(this.api), ['data', 'error', 'hide']);

    assert.true(isFrozen(this.api));

    assert.strictEqual(this.api.data, 'foo');
    assert.strictEqual(this.api.error, null);

    assert.dom('.tooltip').exists();

    await this.api.hide();
    await settled();

    assert.dom('.tooltip').doesNotExist();
  });
});
