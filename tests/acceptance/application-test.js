/* eslint-disable max-len */

import { test } from 'qunit';
import { placementClasses } from '../../tests/helpers/utils';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('tooltips');


test('manual positioning', function(assert) {
  assert.expect(8);
  visit('/');

  andThen(() => fillIn('.position', 'N'));

  andThen(() => triggerEvent('.tooltipper', 'mouseover'));

  andThen(() => assert.deepEqual(placementClasses(find('.tooltip')), ['is-north']));

  andThen(() => fillIn('.position', 'NE'));

  andThen(() => assert.deepEqual(placementClasses(find('.tooltip')), ['is-north', 'is-east']));

  andThen(() => fillIn('.position', 'E'));

  andThen(() => assert.deepEqual(placementClasses(find('.tooltip')), ['is-east']));

  andThen(() => fillIn('.position', 'SE'));

  andThen(() => assert.deepEqual(placementClasses(find('.tooltip')), ['is-east', 'is-south']));

  andThen(() => fillIn('.position', 'S'));

  andThen(() => assert.deepEqual(placementClasses(find('.tooltip')), ['is-south']));

  andThen(() => fillIn('.position', 'SW'));

  andThen(() => assert.deepEqual(placementClasses(find('.tooltip')), ['is-south', 'is-west']));

  andThen(() => fillIn('.position', 'W'));

  andThen(() => assert.deepEqual(placementClasses(find('.tooltip')), ['is-west']));

  andThen(() => fillIn('.position', 'NW'));

  andThen(() => assert.deepEqual(placementClasses(find('.tooltip')), ['is-north', 'is-west']));
});
