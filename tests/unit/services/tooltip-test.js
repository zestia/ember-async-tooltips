import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('service:tooltip', function(hooks) {
  setupTest(hooks);

  let tooltipService;
  let fooTooltipper;
  let barTooltipper;

  hooks.beforeEach(function() {
    tooltipService = this.owner.lookup('service:tooltip');
    fooTooltipper = new (class FooTooltipper {})();
    barTooltipper = new (class BarTooltipper {})();
  });

  test('#add', function(assert) {
    assert.expect(2);

    tooltipService.add(fooTooltipper);

    assert.deepEqual(
      tooltipService.tooltippers,
      [fooTooltipper],
      'adds the tooltipper instance to the array of tooltippers'
    );

    tooltipService.add(barTooltipper);

    assert.deepEqual(
      tooltipService.tooltippers,
      [fooTooltipper, barTooltipper],
      'pushes more tooltippers to the array'
    );
  });

  test('#remove', function(assert) {
    assert.expect(2);

    tooltipService.add(fooTooltipper);

    assert.deepEqual(
      tooltipService.tooltippers,
      [fooTooltipper],
      'precondition'
    );

    tooltipService.remove(fooTooltipper);

    assert.deepEqual(
      tooltipService.tooltippers,
      [],
      'removes specific tooltipper component instances from the array'
    );
  });
});
