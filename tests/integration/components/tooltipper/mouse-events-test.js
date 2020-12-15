import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('mouse events off', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <Tooltipper
        @mouseEvents={{false}}
        @tooltip={{component "tooltip"}}
      />
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltip').doesNotExist('will not render a tooltip');
  });

  test('mouse events nullish', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <Tooltipper
        @mouseEvents={{null}}
        @tooltip={{component "tooltip"}}
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

  test('multiple manually shown tooltips', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <Tooltipper
        @mouseEvents={{false}}
        @tooltip={{component "tooltip"}} as |tooltipper|
      >
        <button type="button" {{on "click" tooltipper.showTooltip}}>
          Show 1
        </button>
      </Tooltipper>

      <Tooltipper
        @mouseEvents={{false}}
        @tooltip={{component "tooltip"}} as |tooltipper|
      >
        <button type="button" {{on "click" tooltipper.showTooltip}}>
          Show 2
        </button>
      </Tooltipper>
    `);

    await click('.tooltipper:nth-child(1) button');
    await click('.tooltipper:nth-child(2) button');

    assert
      .dom('.tooltip')
      .exists(
        { count: 2 },
        'multiple tooltips can be rendered at any one time ' +
          'if they were manually shown (without mouse enter event)'
      );
  });
});
