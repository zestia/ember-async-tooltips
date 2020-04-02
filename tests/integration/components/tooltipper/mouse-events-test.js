import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('mouse events', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <Tooltipper
        @mouseEvents={{false}}
        @tooltip={{component "tooltip"}} />
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltip').doesNotExist('will not render a tooltip');
  });

  test('mouse events', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <Tooltipper
        @mouseEvents={{null}}
        @tooltip={{component "tooltip"}} />
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert
      .dom('.tooltip')
      .exists(
        'will render by default ' +
          '(needs to be specifically set to true or false to take affect)'
      );
  });
});
