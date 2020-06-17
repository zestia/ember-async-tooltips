import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, triggerEvent, fillIn } from '@ember/test-helpers';

module('tooltips', function (hooks) {
  setupApplicationTest(hooks);

  test('manual positioning', async function (assert) {
    assert.expect(12);

    await visit('/position');

    await triggerEvent('.tooltipper', 'mouseenter');

    await fillIn('.position-page__position', 'top left');

    assert.dom('.tooltip').hasClass('tooltip--top-left');

    await fillIn('.position-page__position', 'top center');

    assert.dom('.tooltip').hasClass('tooltip--top-center');

    await fillIn('.position-page__position', 'top right');

    assert.dom('.tooltip').hasClass('tooltip--top-right');

    await fillIn('.position-page__position', 'right middle');

    assert.dom('.tooltip').hasClass('tooltip--right-middle');

    await fillIn('.position-page__position', 'right top');

    assert.dom('.tooltip').hasClass('tooltip--right-top');

    await fillIn('.position-page__position', 'right bottom');

    assert.dom('.tooltip').hasClass('tooltip--right-bottom');

    await fillIn('.position-page__position', 'bottom right');

    assert.dom('.tooltip').hasClass('tooltip--bottom-right');

    await fillIn('.position-page__position', 'bottom center');

    assert.dom('.tooltip').hasClass('tooltip--bottom-center');

    await fillIn('.position-page__position', 'bottom left');

    assert.dom('.tooltip').hasClass('tooltip--bottom-left');

    await fillIn('.position-page__position', 'left middle');

    assert.dom('.tooltip').hasClass('tooltip--left-middle');

    await fillIn('.position-page__position', 'left top');

    assert.dom('.tooltip').hasClass('tooltip--left-top');

    await fillIn('.position-page__position', 'left bottom');

    assert.dom('.tooltip').hasClass('tooltip--left-bottom');
  });
});
