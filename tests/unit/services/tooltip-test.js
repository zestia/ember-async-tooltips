import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Tooltipper from '@zestia/ember-async-tooltips/components/tooltipper';

let tooltipService;
let fooTooltipper;
let barTooltipper;

module('service:tooltip', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('component:foo-tooltipper', Tooltipper);
    this.owner.register('component:bar-tooltipper', Tooltipper);

    tooltipService = this.owner.lookup('service:tooltip');
    fooTooltipper = this.owner.lookup('component:foo-tooltipper');
    barTooltipper = this.owner.lookup('component:bar-tooltipper');
  });

  test('#add', function(assert) {
    assert.expect(2);

    tooltipService.add(fooTooltipper);

    assert.deepEqual(
      tooltipService.get('tooltippers'),
      [fooTooltipper],
      'adds the tooltipper instance to the array of tooltippers'
    );

    tooltipService.add(barTooltipper);

    assert.deepEqual(
      tooltipService.get('tooltippers'),
      [fooTooltipper, barTooltipper],
      'pushes more tooltippers to the array'
    );
  });

  test('#remove', function(assert) {
    assert.expect(2);

    tooltipService.add(fooTooltipper);

    assert.deepEqual(
      tooltipService.get('tooltippers'),
      [fooTooltipper],
      'precondition'
    );

    tooltipService.remove(fooTooltipper);

    assert.deepEqual(
      tooltipService.get('tooltippers'),
      [],
      'removes specific tooltipper component instances from the array'
    );
  });
});
