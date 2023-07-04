import { module, test } from 'qunit';
import setupTooltipperTest from 'dummy/tests/integration/components/tooltip/setup';
import { render, waitFor, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import waitForAnimation from 'dummy/tests/helpers/wait-for-animation';

module('tooltip | showing & hiding', function (hooks) {
  setupTooltipperTest(hooks);

  test('showing & hiding', async function (assert) {
    assert.expect(8);

    this.tooltipShown = () => assert.step('tooltip shown');
    this.tooltipHidden = () => assert.step('tooltip hidden');

    await render(hbs`
      <div>
        <Tooltip
          @show={{this.show}}
          @onShow={{this.tooltipShown}}
          @onHide={{this.tooltipHidden}}
        />
      </div>
    `);

    this.set('show', true);

    await waitFor(".tooltip[data-showing='true']");

    assert.verifySteps([]);

    this.animations = await waitForAnimation('.tooltip', {
      animationName: 'fade-in'
    });

    assert.strictEqual(this.animations.length, 1);

    await settled();

    assert.verifySteps(['tooltip shown']);

    this.set('show', false);

    await waitFor(".tooltip[data-showing='false']");

    assert.verifySteps([]);

    this.animations = await waitForAnimation('.tooltip', {
      animationName: 'fade-out'
    });

    assert.strictEqual(this.animations.length, 1);

    await settled();

    assert.verifySteps(['tooltip hidden']);
  });
});
