import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { settled, render, click, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.tooltipService = this.owner.lookup('service:tooltip');
  });

  test('rendering test', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <Tooltipper
        @mouseEvents={{false}}
        @tooltip={{component "tooltip"}} as |tooltipper|
      >
        <button type="button" {{on "click" tooltipper.showTooltip}}>
          Show
        </button>
      </Tooltipper>
    `);

    await click('button');
    await click('button');

    assert.equal(
      this.tooltipService.tooltippers.length,
      1,
      'correctly keeps track of tooltips'
    );
  });

  test('cancel destroying tooltip when animating out', async function (assert) {
    assert.expect(2);

    // This test simulates hovering over a tooltipper whilst a tooltip is
    // animating out. The tooltip should finish hiding and then show again,
    // and not be destroyed and rerendered.

    await render(hbs`
      <Tooltipper
        @showTooltip={{true}}
        @tooltip={{component "tooltip"}}
      />
    `);

    const tooltipper = this.tooltipService.tooltippers[0];
    const willHideTooltip = tooltipper.actions.hideTooltip.call(tooltipper);

    triggerEvent('.tooltipper', 'mouseenter');

    await willHideTooltip;

    await settled();

    assert.dom('.tooltip').exists('tooltip is not destroyed');
    assert.dom('.tooltip').hasClass('tooltip--showing', 'is not hidden');
  });

  test('tearing down', async function (assert) {
    assert.expect(0);

    // This regression test checks that when a tooltipoer is destroyed,
    // that the tooltip service does not hold on to a reference
    // to its tooltip, which should also be destroyed.

    this.show = true;

    await render(hbs`
      {{#if this.show}}
        <Tooltipper @tooltip={{component "tooltip"}} />
      {{/if}}

      <Tooltipper @tooltip={{component "tooltip"}} />
    `);

    await triggerEvent('.tooltipper:nth-child(1)', 'mouseenter');

    this.set('show', false);

    await triggerEvent('.tooltipper:nth-child(1)', 'mouseenter');
  });
});
