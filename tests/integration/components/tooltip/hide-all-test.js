import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | hide all', function (hooks) {
  setupTooltipperTest(hooks);

  test('can hide all tooltips', async function (assert) {
    assert.expect(2);

    // hideAllTooltips can be called directly
    // without having to use `@action` to bind `this`.

    this.tooltipService = this.owner.lookup('service:tooltip');

    await render(hbs`
      <div>
        <Tooltip @show={{true}} />
      </div>

      <div>
        <Tooltip @show={{true}} />
      </div>

      <button
        type="button"
        {{on "click" this.tooltipService.hideAllTooltips}}
      ></button>
    `);

    assert.dom('.tooltip').exists({ count: 2 });

    await click('button');

    assert.dom('.tooltip').exists({ count: 0 });
  });
});
