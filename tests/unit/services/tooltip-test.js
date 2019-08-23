import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Component from '@ember/component';

let tooltipService;
let fooTooltipper;
let barTooltipper;

module('service:tooltip', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('component:tool-tip/foo', Component);
    this.owner.register('component:tool-tip/bar', Component);

    tooltipService = this.owner.lookup('service:tooltip');
    fooTooltipper = this.owner.lookup('component:tool-tip/foo');
    barTooltipper = this.owner.lookup('component:tool-tip/bar');
  });

  test('#activate', function(assert) {
    assert.expect(2);

    tooltipService.activate(fooTooltipper);

    assert.deepEqual(
      tooltipService.get('tooltippers'),
      [fooTooltipper],
      'adds the tooltipper instance to the array of tooltippers'
    );

    tooltipService.activate(barTooltipper);

    assert.deepEqual(
      tooltipService.get('tooltippers'),
      [fooTooltipper, barTooltipper],
      'pushes more tooltippers to the array'
    );
  });

  test('#deactivate', function(assert) {
    assert.expect(2);

    tooltipService.activate(fooTooltipper);

    assert.deepEqual(
      tooltipService.get('tooltippers'),
      [fooTooltipper],
      'precondition'
    );

    tooltipService.deactivate(fooTooltipper);

    assert.deepEqual(
      tooltipService.get('tooltippers'),
      [],
      'removes specific tooltipper component instances from the array'
    );
  });
});
