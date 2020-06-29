import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, settled, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import waitForAnimation from '../../../helpers/wait-for-animation';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  hooks.beforeEach(function () {
    this.tooltipService = this.owner.lookup('service:tooltip');
  });

  test('mouse enter reference', async function (assert) {
    assert.expect(2);

    await render(hbs`<Tooltipper @tooltip={{component "tooltip"}} />`);

    assert.dom('.tooltip').doesNotExist('does not render too');

    await triggerEvent('.tooltipper', 'mouseenter');

    assert
      .dom('.tooltip')
      .exists('renders tooltip when mousing over the toolipper');
  });

  test('mouse leave reference', async function (assert) {
    assert.expect(2);

    await render(hbs`<Tooltipper @tooltip={{component "tooltip"}} />`);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltip').exists('precondition: tooltip present');

    await triggerEvent('.tooltipper', 'mouseleave');

    await waitForAnimation('.tooltip');

    assert
      .dom('.tooltip')
      .doesNotExist('tooltip hidden when mouse leaves tooltipper');
  });

  test('mouse leave tooltip', async function (assert) {
    assert.expect(2);

    await render(hbs`<Tooltipper @tooltip={{component "tooltip"}} />`);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltip').exists('precondition: tooltip present');

    await triggerEvent('.tooltip', 'mouseleave');

    await waitForAnimation('.tooltip');

    assert
      .dom('.tooltip')
      .doesNotExist('tooltip hidden when mouse leaves tooltip');
  });

  test('mouse enter / loading data', async function (assert) {
    assert.expect(2);

    this.load = () => assert.step('loading data');

    await render(hbs`
      <Tooltipper
        @onLoad={{this.load}}
        @tooltip={{component "tooltip"}} />
    `);

    // Intentionally no await
    triggerEvent('.tooltipper', 'mouseenter');
    triggerEvent('.tooltipper', 'mouseenter');

    await settled();

    assert.verifySteps(['loading data'], 'load action is only fired once once');
  });

  test('mouse leave / loading data', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <Tooltipper
        @tooltip={{component "tooltip"}} />
    `);

    // Intentionally no await
    triggerEvent('.tooltipper', 'mouseenter');
    triggerEvent('.tooltipper', 'mouseleave');

    await settled();

    assert.dom('.tooltip').doesNotExist();
  });

  test('mouse enter / destroying', async function (assert) {
    assert.expect(0);

    this.set('showTooltipper', true);

    await render(hbs`
      {{#if this.showTooltipper}}
        <Tooltipper
          @showDelay={{200}}
          @tooltip={{component "tooltip"}} />
      {{/if}}
    `);

    triggerEvent('.tooltipper', 'mouseenter');

    this.set('showTooltipper', false);

    await settled();
  });

  test('mouse enter / mouse leave tooltipper', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <Tooltipper @tooltip={{component "tooltip"}} />
    `);

    // Intentionally no await
    triggerEvent('.tooltipper', 'mouseenter');
    triggerEvent('.tooltipper', 'mouseleave');

    await settled();

    assert.dom('.tooltip').doesNotExist('never needlessly renders');
  });

  test('mouse leave tooltip whilst still over tooltipper', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <Tooltipper @tooltip={{component "tooltip"}} />
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    await triggerEvent('.tooltip', 'mouseleave', { bubbles: false });

    await waitForAnimation('.tooltip');

    await settled();

    assert
      .dom('.tooltip')
      .exists('mouse still over tooltipper, so tooltip should be present');
  });

  test('mouse leave tooltipper whilst still over tooltip', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <Tooltipper @tooltip={{component "tooltip"}} />
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    await triggerEvent('.tooltip', 'mouseenter');

    await triggerEvent('.tooltipper', 'mouseleave', { bubbles: false });

    await waitForAnimation('.tooltip');

    await settled();

    assert
      .dom('.tooltip')
      .exists('mouse still over tooltip, so tooltip should be present');
  });
});
