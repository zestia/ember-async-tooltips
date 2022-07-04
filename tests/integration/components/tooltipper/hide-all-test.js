import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('hide all', async function (assert) {
    assert.expect(2);

    // hideAllTooltips can be called directly
    // without having to use `@action` to bind `this`.

    this.tooltipService = this.owner.lookup('service:tooltip');

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "tooltip"}}
        @showTooltip={{true}}
      />

      <Tooltipper
        @Tooltip={{component "tooltip"}}
        @showTooltip={{true}}
      />

      <button
        type="button"
        class="hide-all"
        {{on "click" this.tooltipService.hideAllTooltips}}
      ></button>
    `);

    assert
      .dom('.tooltip')
      .exists({ count: 2 }, 'precondition: two tooltips are rendered');

    await click('.hide-all');

    assert
      .dom('.tooltip')
      .exists({ count: 0 }, 'tooltips are no longer rendered');
  });
});
