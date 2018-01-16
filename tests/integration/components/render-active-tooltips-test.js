import { test, moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import TooltipComponent
  from '@zestia/ember-async-tooltips/components/tool-tip';
import TooltipperComponent
  from '@zestia/ember-async-tooltips/components/tool-tipper';


moduleForComponent('render-active-tooltips', {
  integration: true
});


test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{render-active-tooltips}}`);

  assert.equal(this.$().html(), '<!---->',
    'does not blow up if no tooltips are active');
});


test('it renders tooltip components', function(assert) {
  assert.expect(4);

  const FooTooltipComponent = TooltipComponent.extend({
    classNames: ['foo-tooltip'],
    layout: hbs`Hello World ({{my-attr}})`
  });

  const FooTooltipperComponent = TooltipperComponent.extend({
    classNames: ['foo-tooltipper']
  });

  this.register('component:foo-tooltip',    FooTooltipComponent);
  this.register('component:foo-tooltipper', FooTooltipperComponent);

  this.render(hbs`

    <div class="in">
      {{foo-tooltipper tooltip=(component "foo-tooltip" my-attr="foo")}}
    </div>

    <div class="out">
      {{render-active-tooltips}}
    </div>

  `);

  this.$('.in .foo-tooltipper').trigger('mouseover');

  assert.equal(this.$('.foo-tooltip').length, 0,
    'tooltip is not rendered yet (still hovering over it)');

  return wait()
    .then(() => {
      assert.equal(this.$('.out .foo-tooltip').length, 1,
        'the tooltip is rendered');

      this.$('.foo-tooltipper').trigger('mouseout');

      assert.equal(this.$('.foo-tooltip').length, 1,
        'tooltip is not destroyed yet (due to hover delay)');

      return wait();
    })
    .then(() => {
      this.$('.foo-tooltip').trigger('animationEnd');
      return wait();
    })
    .then(() => {
      assert.equal(this.$('.out .foo-tooltip').length, 0,
        'the tooltip is destroyed after its hide animation');
    });
});
