import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, findAll, triggerEvent, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import TooltipComponent from '@zestia/ember-async-tooltips/components/tool-tip';
import TooltipperComponent from '@zestia/ember-async-tooltips/components/tool-tipper';

module('render-active-tooltips', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs`{{render-active-tooltips}}`);

    assert.equal(this.get('element').innerHTML, '<!---->',
      'does not blow up if no tooltips are active');
  });

  test('it renders tooltip components', async function(assert) {
    assert.expect(8);

    const FooTooltipComponent = TooltipComponent.extend({
      classNames: ['foo-tooltip'],
      layout: hbs`
        Hello World ({{@myAttr}})<br>
        <button class="hide-from-tooltip" onclick={{action "hide"}}></button>
      `
    });

    const FooTooltipperComponent = TooltipperComponent.extend({
      classNames: ['foo-tooltipper']
    });

    this.owner.register('component:foo-tooltip',    FooTooltipComponent);
    this.owner.register('component:foo-tooltipper', FooTooltipperComponent);

    await render(hbs`
      <div class="in">
        {{#foo-tooltipper tooltip=(component "foo-tooltip" myMattr="foo") as |tt|}}
          <button class="show-from-tooltipper" onclick={{action tt.showTooltip}}></button>
          <button class="hide-from-tooltipper" onclick={{action tt.hideTooltip}}></button>
        {{/foo-tooltipper}}
      </div>

      <div class="out">
        {{render-active-tooltips}}
      </div>
    `);

    triggerEvent('.in .foo-tooltipper', 'mouseover');

    assert.equal(findAll('.foo-tooltip').length, 0,
      'tooltip is not rendered yet (still hovering over it)');

    await settled();

    assert.equal(findAll('.out .foo-tooltip').length, 1,
      'the tooltip is rendered elsewhere');

    await triggerEvent('.foo-tooltipper', 'mouseout');

    assert.equal(findAll('.foo-tooltip').length, 1,
      'tooltip is not destroyed yet (due to hover delay)');

    await triggerEvent('.foo-tooltip', 'animationEnd');

    assert.equal(findAll('.out .foo-tooltip').length, 0,
      'the tooltip is destroyed after its hide animation');

    await click('.show-from-tooltipper');

    assert.equal(findAll('.foo-tooltip').length, 1,
      'tooltip can be manually shown by tooltipper');

    await click('.hide-from-tooltipper');

    await triggerEvent('.foo-tooltip', 'animationEnd');

    assert.equal(findAll('.foo-tooltip').length, 0,
      'tooltip can be manually hidden by tooltipper');

    await triggerEvent('.foo-tooltipper', 'mouseover');

    assert.equal(findAll('.foo-tooltip').length, 1,
      'precondition: tooltip shown');

    await click('.hide-from-tooltip');

    await triggerEvent('.foo-tooltip', 'animationEnd');

    assert.equal(findAll('.foo-tooltip').length, 0,
      'tooltip can be hidden by itself');
  });
});
