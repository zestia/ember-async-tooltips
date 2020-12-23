import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import waitForAnimation from '../../../helpers/wait-for-animation';
import { defer } from 'rsvp';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('loading data', async function (assert) {
    assert.expect(4);

    this.showTooltip = true;

    const deferred = defer();

    this.loadTooltip = () => {
      assert.step('load tooltip');

      return deferred.promise;
    };

    await render(hbs`
      <Tooltipper
        @showTooltip={{this.showTooltip}}
        @onLoad={{this.loadTooltip}}
        @tooltip={{component "custom-tooltip"}}
      />
    `);

    assert.dom('.tooltip').doesNotExist('not rendered tooltip yet');

    deferred.resolve({ greeting: 'Hello World' });

    await settled();

    assert
      .dom('.tooltip')
      .hasText('Hello World', 'the loaded data is passed to the tooltip');

    this.set('showTooltip', false);

    await waitForAnimation('.tooltip');
    await settled();

    this.set('showTooltip', true);

    await settled();

    assert.verifySteps(
      ['load tooltip'],
      'load is not called on a subsequent render of the tooltip'
    );
  });
});
