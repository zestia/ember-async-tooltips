import { module, test } from 'qunit';
import setupTooltipperTest from 'dummy/tests/integration/components/tooltip/setup';
import { render, waitUntil, settled, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';

module('tooltip | loading data', function (hooks) {
  setupTooltipperTest(hooks);

  test('loading data', async function (assert) {
    assert.expect(6);

    const deferred = defer();

    this.load = () => {
      assert.step('load tooltip');

      return deferred.promise;
    };

    await render(hbs`
      <div>
        <Tooltip @onLoad={{this.load}} as |tooltip|>
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

  test('loading data with show arg renders correct position straight away', async function (assert) {
    assert.expect(2);

    this.load = () => this.resolve({ greeting: 'Hello World' }, 50);

    render(hbs`
      <div>
        Hover over me

        <Tooltip
          @onLoad={{this.load}}
          @show={{true}}
          @position="bottom center"
          as |tooltip|
        >
          {{tooltip.data.greeting}}
        </Tooltip>
      </div>
    `);

    await waitUntil(() => this.hasText('.tooltip', 'Hello World'));

    this.assertPosition('.tooltip', { left: 8, top: 14 });
  });
});
