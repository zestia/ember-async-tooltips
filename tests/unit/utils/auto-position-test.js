import { module, test } from 'qunit';
import autoPosition from '@zestia/ember-async-tooltips/utils/auto-position';

module('autoPosition', function(hooks) {
  test('#autoPosition', function(assert) {
    assert.expect(9);

    assert.equal(autoPosition('top left'), 'bottom left');
    assert.equal(autoPosition('top right'), 'bottom right');
    assert.equal(autoPosition('top center'), 'bottom center');

    assert.equal(autoPosition('bottom left'), 'top left');
    assert.equal(autoPosition('bottom right'), 'top right');
    assert.equal(autoPosition('bottom center'), 'top center');

    assert.equal(autoPosition('middle left'), 'right middle');
    assert.equal(autoPosition('middle right'), 'left middle');
    assert.equal(autoPosition('middle center'), 'bottom center');
  });
});
