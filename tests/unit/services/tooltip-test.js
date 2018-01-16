import { getOwner } from '@ember/application';
import { test, moduleFor } from 'ember-qunit';
import Component from '@ember/component';

let tooltipService;
let fooTooltipper;
let barTooltipper;


moduleFor('service:tooltip', {
  beforeEach() {
    const owner = getOwner(this);

    owner.register('component:tool-tip/foo', Component);
    owner.register('component:tool-tip/bar', Component);

    tooltipService = this.subject();
    fooTooltipper  = owner.lookup('component:tool-tip/foo');
    barTooltipper  = owner.lookup('component:tool-tip/bar');
  }
});



test('#activate', function(assert) {
  assert.expect(2);

  tooltipService.activate(fooTooltipper);

  assert.deepEqual(tooltipService.get('tooltippers'), [fooTooltipper],
    'adds the tooltipper instance to the array of active tooltippers');

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

  assert.deepEqual(tooltipService.get('tooltippers'), [fooTooltipper],
    'precondition');

  tooltipService.deactivate(fooTooltipper);

  assert.deepEqual(tooltipService.get('tooltippers'), [],
    'removes specific tooltipper component instances from the array');
});
