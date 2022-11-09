import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('service:tooltip', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.tooltipService = this.owner.lookup('service:tooltip');
    this.fooTooltip = new (class FooTooltip {})();
    this.barTooltip = new (class BarTooltip {})();
  });

  test('#add', function (assert) {
    assert.expect(2);

    this.tooltipService.add(this.fooTooltip);

    assert.deepEqual(this.tooltipService.tooltips, [this.fooTooltip]);

    this.tooltipService.add(this.barTooltip);

    assert.deepEqual(this.tooltipService.tooltips, [
      this.fooTooltip,
      this.barTooltip
    ]);
  });

  test('#remove', function (assert) {
    assert.expect(2);

    this.tooltipService.add(this.fooTooltip);

    assert.deepEqual(this.tooltipService.tooltips, [this.fooTooltip]);

    this.tooltipService.remove(this.fooTooltip);

    assert.deepEqual(this.tooltipService.tooltips, []);
  });
});
