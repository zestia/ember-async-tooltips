import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, triggerEvent, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import TooltipComponent from '@zestia/ember-async-tooltips/components/tool-tip';
import TooltipperComponent from '@zestia/ember-async-tooltips/components/tool-tipper';

module('render-tooltips', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs`<RenderTooltips />`);

    assert.equal(this.element.innerHTML, '<!---->', 'does not blow up');
  });

  test('it renders tooltip components', async function(assert) {
    assert.expect(10);

    const FooTooltipComponent = TooltipComponent.extend({
      classNames: ['foo-tooltip'],
      layout: hbs`
        Hello World ({{@myArg}})<br>
        <button class="hide-from-tooltip" onclick={{action "hide"}}></button>
      `
    });

    const FooTooltipperComponent = TooltipperComponent.extend({
      classNames: ['foo-tooltipper']
    });

    this.owner.register('component:foo-tooltip', FooTooltipComponent);
    this.owner.register('component:foo-tooltipper', FooTooltipperComponent);

    await render(hbs`
      <div class="in">
        <FooTooltipper @tooltip={{component "foo-tooltip" myArg="foo"}} as |tt|>
          <button class="show-from-tooltipper" onclick={{action tt.showTooltip}}></button>
          <button class="hide-from-tooltipper" onclick={{action tt.hideTooltip}}></button>
          <button class="toggle-from-tooltipper" onclick={{action tt.toggleTooltip}}></button>
        </FooTooltipper>
      </div>

      <div class="out">
        <RenderTooltips />
      </div>
    `);

    triggerEvent('.in .foo-tooltipper', 'mouseenter');

    assert
      .dom('.foo-tooltip')
      .doesNotExist('tooltip is not rendered yet (still hovering over it)');

    await settled();

    assert
      .dom('.out .foo-tooltip')
      .exists({ count: 1 }, 'the tooltip is rendered elsewhere');

    await triggerEvent('.foo-tooltipper', 'mouseleave');

    assert
      .dom('.foo-tooltip')
      .exists(
        { count: 1 },
        'tooltip is not destroyed yet (due to hover delay)'
      );

    await triggerEvent('.foo-tooltip', 'animationEnd');

    assert
      .dom('.out .foo-tooltip')
      .doesNotExist('the tooltip is destroyed after its hide animation');

    await click('.show-from-tooltipper');

    assert
      .dom('.foo-tooltip')
      .exists({ count: 1 }, 'tooltip can be manually shown by tooltipper');

    await click('.hide-from-tooltipper');

    await triggerEvent('.foo-tooltip', 'animationEnd');

    assert
      .dom('.foo-tooltip')
      .doesNotExist('tooltip can be manually hidden by tooltipper');

    await triggerEvent('.foo-tooltipper', 'mouseenter');

    assert
      .dom('.foo-tooltip')
      .exists({ count: 1 }, 'precondition: tooltip shown');

    await click('.hide-from-tooltip');

    await triggerEvent('.foo-tooltip', 'animationEnd');

    assert.dom('.foo-tooltip').doesNotExist('tooltip can be hidden by itself');

    await click('.toggle-from-tooltipper');

    assert
      .dom('.foo-tooltip')
      .exists({ count: 1 }, 'tooltip can be manually shown (toggled)');

    await click('.toggle-from-tooltipper');

    await triggerEvent('.foo-tooltip', 'animationEnd');

    assert
      .dom('.foo-tooltip')
      .doesNotExist('tooltip can be manually hidden (toggled)');
  });
});
