import { module, test } from 'qunit';
import autoPosition from '@zestia/ember-async-tooltips/utils/auto-position';

module('autoPosition', function(hooks) {
  test('#autoPosition', function(assert) {
    // assert.expect(2);

    // Default

    assert.deepEqual(autoPosition(), { N: false, S: true, E: false, W: false },
      'south of tooltipper');

    // Chose the opposite

    assert.deepEqual(autoPosition({ N: true }), { N: false, S: true, E: false, W: false },
      'south of tooltipper');

    assert.deepEqual(autoPosition({ E: true }), { N: false, S: false, E: false, W: true },
      'west of tooltipper');

    assert.deepEqual(autoPosition({ S: true }), { N: true, S: false, E: false, W: false },
      'north of tooltipper');

    assert.deepEqual(autoPosition({ W: true }), { N: false, S: false, E: true, W: false },
      'east of tooltipper');

    // Choose a combination

    assert.deepEqual(autoPosition({ N: true, E: true }), { N: false, S: true, E: true, W: false },
      'south of tooltipper in the east');

    assert.deepEqual(autoPosition({ N: true, W: true }), { N: false, S: true, E: false, W: true },
      'south of tooltipper in the west');

    assert.deepEqual(autoPosition({ S: true, E: true }), { N: true, S: false, E: true, W: false },
      'north of tooltipper in the east');

    assert.deepEqual(autoPosition({ S: true, W: true }), { N: true, S: false, E: false, W: true },
      'north of tooltipper in the west');
  });
});
