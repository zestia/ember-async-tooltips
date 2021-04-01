import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { later } from '@ember/runloop';
import waitForAnimation from '../../../helpers/wait-for-animation';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('load less than show delay', async function (assert) {
    assert.expect(3);

    this.load = () => {
      return new Promise((resolve) => {
        later(resolve, 50);
      });
    };

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "tooltip"}}
        @onLoad={{this.load}}
        @showDelay={{100}}
      />
    `);

    assert.dom('.tooltip').doesNotExist('does not render tooltip');

    this.startTimer();

    await triggerEvent('.tooltipper', 'mouseenter');

    this.stopTimer();

    assert
      .dom('.tooltip')
      .exists('renders tooltip when mousing over the toolipper');

    assert.ok(this.timeTaken() >= 100, 'will render after the show delay');
  });

  test('load delay more than show delay', async function (assert) {
    assert.expect(3);

    this.load = () => {
      return new Promise((resolve) => {
        later(resolve, 200);
      });
    };

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "tooltip"}}
        @onLoad={{this.load}}
        @showDelay={{100}}
      />
    `);

    assert.dom('.tooltip').doesNotExist('does not render tooltip');

    this.startTimer();

    await triggerEvent('.tooltipper', 'mouseenter');

    this.stopTimer();

    assert
      .dom('.tooltip')
      .exists('renders tooltip when mousing over the toolipper');

    assert.ok(
      this.timeTaken() >= 200,
      'will render after the load time, because it exceeded the show delay'
    );
  });

  test('hide delay', async function (assert) {
    assert.expect(4);

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "tooltip"}}
        @showTooltip={{true}}
        @hideDelay={{100}}
      />
    `);

    this.startTimer();

    await triggerEvent('.tooltipper', 'mouseleave');

    assert.dom('.tooltip').exists('tooltip still present on mouseleave');

    this.stopTimer();

    const time = this.timeTaken();

    const delayed = time >= 100 && time <= 120;

    assert.ok(delayed, `approximately 100ms hide delay (${time}ms)`);

    assert
      .dom('.tooltip')
      .exists('tooltip still present whilst hide animation is taking place');

    await waitForAnimation('.tooltip');

    assert.dom('.tooltip').doesNotExist('hidden after animation');
  });
});
