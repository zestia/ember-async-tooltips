import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | cancelling', function (hooks) {
  setupTooltipperTest(hooks);

  test('tooltips scheduled to show, will be cancelled', async function (assert) {
    assert.expect(1);

    this.show = true;

    await render(hbs`
      <div>
        <Tooltip @showDelay={{1000}} @show={{this.show}} />
      </div>
    `);

    triggerEvent('.tooltipper', 'mouseenter');

    await this.wait(500);

    this.set('show', false);

    await settled();

    assert.dom('.tooltip').doesNotExist();
  });
});
