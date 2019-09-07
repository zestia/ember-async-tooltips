import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { resolve } from 'rsvp';

module('tooltipper', function(hooks) {
  setupTooltipperTest(hooks);

  test('show arg', async function(assert) {
    assert.expect(1);

    this.loadTooltip = () => {
      assert.step('load tooltip');
      return resolve({ name: 'World' });
    };

    await render(hbs`
      <Tooltipper
        @showTooltip={{this.showTooltip}}
        @onLoad={{this.loadTooltip}}
        @tooltip={{component "foo-tooltip"}} />
    `);

    assert.dom('.tooltipper').hasText(/^$/, 'not rendered the tooltip');

    this.set('showTooltip', true);

    assert.verifySteps(['load tooltip'], 'will call load tooltip');

    assert
      .dom('.tooltipper > .tooltip')
      .exists('tooltip is rendered as a child');

    console.log(this.element.innerHTML);
  });
});
