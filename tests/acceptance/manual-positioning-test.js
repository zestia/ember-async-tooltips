import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, triggerEvent, fillIn } from '@ember/test-helpers';

module('tooltips', function(hooks) {
  setupApplicationTest(hooks);

  test('manual positioning', async function(assert) {
    assert.expect(12);

    await visit('/position');

    await triggerEvent('.tooltipper', 'mouseenter');

    await fillIn('.position', 'top left');

    assert.dom('.tooltip').hasClass('is-top-left');

    await fillIn('.position', 'top center');

    assert.dom('.tooltip').hasClass('is-top-center');

    await fillIn('.position', 'top right');

    assert.dom('.tooltip').hasClass('is-top-right');

    await fillIn('.position', 'right middle');

    assert.dom('.tooltip').hasClass('is-right-middle');

    await fillIn('.position', 'right top');

    assert.dom('.tooltip').hasClass('is-right-top');

    await fillIn('.position', 'right bottom');

    assert.dom('.tooltip').hasClass('is-right-bottom');

    await fillIn('.position', 'bottom right');

    assert.dom('.tooltip').hasClass('is-bottom-right');

    await fillIn('.position', 'bottom center');

    assert.dom('.tooltip').hasClass('is-bottom-center');

    await fillIn('.position', 'bottom left');

    assert.dom('.tooltip').hasClass('is-bottom-left');

    await fillIn('.position', 'left middle');

    assert.dom('.tooltip').hasClass('is-left-middle');

    await fillIn('.position', 'left top');

    assert.dom('.tooltip').hasClass('is-left-top');

    await fillIn('.position', 'left bottom');

    assert.dom('.tooltip').hasClass('is-left-bottom');
  });
});
