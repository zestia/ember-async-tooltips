import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import TooltipComponent from '@zestia/ember-async-tooltips/components/tool-tip';
import TooltipperComponent from '@zestia/ember-async-tooltips/components/tool-tipper';

module('render-active-tooltips', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs`{{render-active-tooltips}}`);

    assert.equal(this.$().html(), '<!---->',
      'does not blow up if no tooltips are active');
  });

  test('it renders tooltip components', async function(assert) {
    assert.expect(6);

    const FooTooltipComponent = TooltipComponent.extend({
      classNames: ['foo-tooltip'],
      layout: hbs`Hello World ({{my-attr}})`
    });

    const FooTooltipperComponent = TooltipperComponent.extend({
      classNames: ['foo-tooltipper']
    });

    this.owner.register('component:foo-tooltip',    FooTooltipComponent);
    this.owner.register('component:foo-tooltipper', FooTooltipperComponent);

    await render(hbs`
      <div class="in">
        {{#foo-tooltipper tooltip=(component "foo-tooltip" my-attr="foo") as |tt|}}
          <button class="show" onclick={{action tt.showTooltip}}></button>
          <button class="hide" onclick={{action tt.hideTooltip}}></button>
        {{/foo-tooltipper}}
      </div>

      <div class="out">
        {{render-active-tooltips}}
      </div>
    `);

    this.$('.in .foo-tooltipper').trigger('mouseover');

    assert.equal(this.$('.foo-tooltip').length, 0,
      'tooltip is not rendered yet (still hovering over it)');

    await settled();

    assert.equal(this.$('.out .foo-tooltip').length, 1,
      'the tooltip is rendered elsewhere');

    this.$('.foo-tooltipper').trigger('mouseout');

    assert.equal(this.$('.foo-tooltip').length, 1,
      'tooltip is not destroyed yet (due to hover delay)');

    await settled();

    this.$('.foo-tooltip').trigger('animationEnd');

    await settled();

    assert.equal(this.$('.out .foo-tooltip').length, 0,
      'the tooltip is destroyed after its hide animation');

    this.$('.show').trigger('click');

    await settled();

    assert.equal(this.$('.foo-tooltip').length, 1,
      'tooltip can be manually shown');

    this.$('.hide').trigger('click');

    this.$('.foo-tooltip').trigger('animationEnd');

    await settled();

    assert.equal(this.$('.foo-tooltip').length, 0,
      'tooltip can be manually hidden');
  });
});
