import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { later } from '@ember/runloop';

module('tooltipper', function(hooks) {
  setupTooltipperTest(hooks);

  hooks.beforeEach(function() {
    this.tooltipService = this.owner.lookup('service:tooltip');
  });

  test('load less than show delay', async function(assert) {
    assert.expect(4);

    this.load = () => {
      return new Promise(resolve => {
        later(resolve, 50);
      });
    };

    await render(hbs`
      <Tooltipper
        @tooltip={{component "foo-tooltip"}}
        @onLoad={{this.load}}
        @showDelay={{100}} />
    `);

    assert.dom('.tooltip').doesNotExist('does not render too');

    await triggerEvent('.tooltipper', 'mouseenter');

    assert
      .dom('.tooltip')
      .exists('renders tooltip when mousing over the toolipper');

    const tooltipper = this.tooltipService.tooltippers[0];

    assert.equal(
      tooltipper.showDelayRemainder,
      tooltipper.showDelay - tooltipper.loadDelay,
      'subtracts the load delay time from the show delay time'
    );

    assert.ok(
      tooltipper.showDelayRemainder > 0 && tooltipper.showDelayRemainder <= 50,
      'correct approximate time to show tooltip'
    );
  });

  test('load delay more than show delay', async function(assert) {
    assert.expect(3);

    this.load = () => {
      return new Promise(resolve => {
        later(resolve, 200);
      });
    };

    await render(hbs`
      <Tooltipper
        @tooltip={{component "foo-tooltip"}}
        @onLoad={{this.load}}
        @showDelay={{100}} />
    `);

    assert.dom('.tooltip').doesNotExist('does not render too');

    await triggerEvent('.tooltipper', 'mouseenter');

    assert
      .dom('.tooltip')
      .exists('renders tooltip when mousing over the toolipper');

    const tooltipper = this.tooltipService.tooltippers[0];

    assert.equal(
      tooltipper.showDelayRemainder,
      0,
      'load delay exceeded show delay, so show delay was ignored'
    );
  });
});
