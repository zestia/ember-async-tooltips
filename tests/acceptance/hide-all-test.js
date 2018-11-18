import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import { visit, triggerEvent } from '@ember/test-helpers';

module('tooltips', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.tooltipService = this.owner.lookup('service:tooltip');
  });

  test('hide all', async function(assert) {
    assert.expect(2);

    await visit('/simple');

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltip').exists();

    await run(() => this.tooltipService.hideActiveTooltips());

    assert.dom('.tooltip').doesNotExist();
  });
});
