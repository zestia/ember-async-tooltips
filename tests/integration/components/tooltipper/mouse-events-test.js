import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('mouse events false', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "tooltip"}}
        @mouseEvents={{false}}
      />
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltip').doesNotExist('will not render a tooltip');
  });

  test('mouseEvents nullish', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "tooltip"}}
        @mouseEvents={{null}}
      />
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert
      .dom('.tooltip')
      .exists(
        'will render by default ' +
          'needs to be specifically set to true or false to take affect - ' +
          'this is useful for composition'
      );
  });

  test('changing mouseEvents', async function (assert) {
    assert.expect(2);

    this.mouseEvents = false;

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "tooltip"}}
        @mouseEvents={{this.mouseEvents}}
      />
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltip').doesNotExist('mouse event listener is off');

    this.set('mouseEvents', true);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltip').exists('mouse event listener is on');
  });

  test('mousing out of a tooltip', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "tooltip"}}
        @mouseEvents={{false}}
        @showTooltip={{true}}
      />
    `);

    assert.dom('.tooltip').exists('preconditon: tooltip present');

    await triggerEvent('.tooltip', 'mouseleave');

    assert.dom('.tooltip').exists('still present because mouse events are off');
  });

  test('multiple tooltips', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <Tooltipper
        class="tooltipper-1"
        @Tooltip={{component "tooltip"}}
        @mouseEvents={{false}} as |tooltipper|
      >
        <button type="button" {{on "click" tooltipper.showTooltip}}></button>
      </Tooltipper>

      <Tooltipper
        class="tooltipper-2"
        @Tooltip={{component "tooltip"}}
      />
    `);

    await click('.tooltipper-1 button');
    await triggerEvent('.tooltipper-2', 'mouseenter');

    assert
      .dom('.tooltip')
      .exists(
        { count: 2 },
        'multiple tooltips can be rendered at any one time'
      );
  });
});
