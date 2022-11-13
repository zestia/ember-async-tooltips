import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, settled, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';

module('tooltip | loading data', function (hooks) {
  setupTooltipperTest(hooks);

  test('loading data', async function (assert) {
    assert.expect(6);

    const deferred = defer();

    this.loadTooltip = () => {
      assert.step('load tooltip');

      return deferred.promise;
    };

    await render(hbs`
      <div>
        <Tooltip @onLoad={{this.loadTooltip}} as |tooltip|>
          {{tooltip.data.greeting}}
        </Tooltip>
      </div>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.verifySteps(['load tooltip']);

    assert.dom('.tooltip').doesNotExist();

    deferred.resolve({ greeting: 'Hello World' });

    await settled();

    assert.dom('.tooltip').containsText('Hello World');

    await triggerEvent('.tooltipper', 'mouseleave');
    await triggerEvent('.tooltipper', 'mouseenter');

    assert.verifySteps([]);

    assert.dom('.tooltip').containsText('Hello World');
  });

  test('mouse enter / loading data', async function (assert) {
    assert.expect(3);

    this.load = () => assert.step('loading data');

    await render(hbs`
      <div>
        <Tooltip @onLoad={{this.load}} />
      </div>
    `);

    triggerEvent('.tooltipper', 'mouseenter');
    triggerEvent('.tooltipper', 'mouseenter');

    await settled();

    assert.verifySteps(['loading data']);

    assert.dom('.tooltip').exists();
  });

  test('mouse leave / loading data', async function (assert) {
    assert.expect(3);

    this.load = () => assert.step('loading data');

    await render(hbs`
      <div>
        <Tooltip @onLoad={{this.load}} />
      </div>
    `);

    triggerEvent('.tooltipper', 'mouseenter');
    triggerEvent('.tooltipper', 'mouseleave');

    await settled();

    assert.verifySteps(['loading data']);

    assert.dom('.tooltip').doesNotExist();
  });

  test('loading data with show arg', async function (assert) {
    assert.expect(4);

    const deferred = defer();

    this.loadTooltip = () => {
      assert.step('load tooltip');

      return deferred.promise;
    };

    await render(hbs`
      <div>
        <Tooltip @onLoad={{this.loadTooltip}} @show={{true}} as |tooltip|>
          {{tooltip.data.greeting}}
        </Tooltip>
      </div>
    `);

    assert.dom('.tooltip').doesNotContainText('Hello World');

    assert.verifySteps(['load tooltip']);

    deferred.resolve({ greeting: 'Hello World' });

    await settled();

    assert.dom('.tooltip').containsText('Hello World');
  });
});
