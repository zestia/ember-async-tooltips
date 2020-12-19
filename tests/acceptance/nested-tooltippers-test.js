import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, triggerEvent, settled } from '@ember/test-helpers';
import waitForAnimation from '../helpers/wait-for-animation';

module('tooltips', function (hooks) {
  setupApplicationTest(hooks);

  test('parent with already rendered child', async function (assert) {
    assert.expect(2);

    await visit('/nesting');

    // To enter the child, one must first enter the parent.
    // The parent's tooltip should be aborted to favour the child.
    // (This only works if the parent is configured to display later)

    await triggerEvent('.inner-tooltipper', 'mouseenter');

    assert.dom('.tooltip').exists({ count: 1 }).hasText('Tooltip for cell');
  });

  test('child with already rendered parent', async function (assert) {
    assert.expect(2);

    await visit('/nesting');

    // After first hovering over a parent to make its tooltip show,
    // and subsequently hovering over a child. Then the parent's tooltip
    // should be removed to favour the child.

    await triggerEvent('.outer-tooltipper', 'mouseenter');
    await triggerEvent('.inner-tooltipper', 'mouseenter');

    await waitForAnimation('.inner-tooltipper > .tooltip');
    await settled();

    assert.dom('.tooltip').exists({ count: 1 }).hasText('Tooltip for cell');
  });
});
