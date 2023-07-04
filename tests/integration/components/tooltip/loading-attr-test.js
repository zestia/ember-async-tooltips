import { module, test } from 'qunit';
import setupTooltipperTest from 'dummy/tests/integration/components/tooltip/setup';
import { render, triggerEvent, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';

module('tooltip | loading attributes', function (hooks) {
  setupTooltipperTest(hooks);

  test('tooltip informs tooltipper it is loading', async function (assert) {
    assert.expect(3);

    this.deferred = defer();

    this.load = () => this.deferred.promise;

    await render(hbs`
      <div>
        <Tooltip @onLoad={{this.load}} />
      </div>
    `);

    assert.dom('.tooltipper').doesNotHaveAttribute('data-loading');

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltipper').hasAttribute('data-loading', 'true');

    this.deferred.resolve();

    await settled();

    assert.dom('.tooltipper').doesNotHaveAttribute('data-loading');
  });
});
