import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { positionClasses } from '../../tests/helpers/utils';
import { visit, find, triggerEvent, fillIn } from '@ember/test-helpers';

module('tooltips', function(hooks) {
  setupApplicationTest(hooks);

  test('manual positioning', async function(assert) {
    assert.expect(8);

    await visit('/position');

    await triggerEvent('.tooltipper', 'mouseenter');

    await fillIn('.position', 'N');

    assert.deepEqual(positionClasses(find('.tooltip')), ['is-north']);

    await fillIn('.position', 'NE');

    assert.deepEqual(positionClasses(find('.tooltip')), ['is-north', 'is-east']);

    await fillIn('.position', 'E');

    assert.deepEqual(positionClasses(find('.tooltip')), ['is-east']);

    await fillIn('.position', 'SE');

    assert.deepEqual(positionClasses(find('.tooltip')), ['is-east', 'is-south']);

    await fillIn('.position', 'S');

    assert.deepEqual(positionClasses(find('.tooltip')), ['is-south']);

    await fillIn('.position', 'SW');

    assert.deepEqual(positionClasses(find('.tooltip')), ['is-south', 'is-west']);

    await fillIn('.position', 'W');

    assert.deepEqual(positionClasses(find('.tooltip')), ['is-west']);

    await fillIn('.position', 'NW');

    assert.deepEqual(positionClasses(find('.tooltip')), ['is-north', 'is-west']);
  });
});
