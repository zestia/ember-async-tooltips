import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | manual', function (hooks) {
  setupTooltipperTest(hooks);

  test('manually showing / hiding test', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <div>
        <Tooltip @show={{this.show}} />
      </div>
    `);

    assert.dom('.tooltip').doesNotExist();

    this.set('show', true);

    await settled();

    assert.dom('.tooltip').exists();

    this.set('show', false);

    await settled();

    assert.dom('.tooltip').doesNotExist();
  });
});
