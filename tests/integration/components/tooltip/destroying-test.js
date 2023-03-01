import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | destroying', function (hooks) {
  setupTooltipperTest(hooks);

  hooks.beforeEach(function () {
    this.tooltipService = this.owner.lookup('service:tooltip');
  });

  test('destroying a tooltipper when about to show its tooltip', async function (assert) {
    assert.expect(2);

    this.show = true;

    await render(hbs`
      {{#if this.show}}
        <div id="tooltipper"></div>
      {{/if}}

      <Tooltip @element="#tooltipper" @showDelay={{1000}} />
    `);

    triggerEvent('.tooltipper', 'mouseenter');

    await this.wait(500);

    this.set('show', false);

    await settled();

    assert.dom('.tooltip').doesNotExist();
    assert.dom('.tooltipper').doesNotExist();
  });

  test('destroying a tooltipper when already showing a tooltip', async function (assert) {
    assert.expect(2);

    this.show = true;

    await render(hbs`
      {{#if this.show}}
        <div id="tooltipper"></div>
      {{/if}}

      <Tooltip @element="#tooltipper" />
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    this.set('show', false);

    await settled();

    assert.dom('.tooltip').exists();
    assert.dom('.tooltipper').doesNotExist();
  });

  test('destroying a tooltip when attached to a tooltipper', async function (assert) {
    assert.expect(5);

    this.show = true;

    await render(hbs`
      <div id="tooltipper"></div>

      {{#if this.show}}
        <Tooltip @element="#tooltipper" />
      {{/if}}
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltip').exists();
    assert.dom('.tooltipper').exists();

    this.set('show', false);

    await settled();

    assert.dom('.tooltip').doesNotExist();
    assert.dom('#tooltipper').doesNotHaveClass('tooltipper');
    assert.dom('#tooltipper').doesNotHaveAttribute('aria-describedby');
  });
});
