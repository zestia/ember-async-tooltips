import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, find, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | aria', function (hooks) {
  setupTooltipperTest(hooks);

  hooks.beforeEach(async function () {
    await render(hbs`
      <div>
        <Tooltip />
      </div>
    `);
  });

  test('the tooltip will be politely announced by screen readers', async function (assert) {
    assert.expect(2);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltip').hasAttribute('role', 'tooltip');
    assert.dom('.tooltip').hasAttribute('aria-live', 'polite');
  });

  test('tooltippers are associated with a tooltip', async function (assert) {
    assert.expect(4);

    assert.dom('.tooltipper').doesNotHaveAttribute('aria-describedby');

    await triggerEvent('.tooltipper', 'mouseenter');

    const id = find('.tooltip').getAttribute('id');

    assert.true(/\w+\d+/.test(id));

    assert.dom('.tooltipper').hasAttribute('aria-describedby', id);

    await triggerEvent('.tooltipper', 'mouseleave');

    assert.dom('.tooltipper').doesNotHaveAttribute('aria-describedby');
  });
});
