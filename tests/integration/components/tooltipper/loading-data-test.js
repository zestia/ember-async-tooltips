import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import {
  render,
  settled,
  triggerEvent,
  getSettledState,
  waitFor
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import waitForAnimation from '../../../helpers/wait-for-animation';
import { defer } from 'rsvp';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('loading data', async function (assert) {
    assert.expect(7);

    const deferred = defer();

    this.loadTooltip = () => {
      assert.step('load tooltip');

      return deferred.promise;
    };

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "greeting-tooltip"}}
        @onLoad={{this.loadTooltip}}
        as |tooltipper|
      >
        Hover over me
        {{#if tooltipper.isLoading}}
          Loading...
        {{/if}}
      </Tooltipper>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltip').doesNotExist('not rendered tooltip yet');

    assert
      .dom('.tooltipper')
      .containsText('Loading...', 'tooltipper knows it is loading the tooltip');

    // Quickly out and in again, whist loading.
    // Intentionally no await.
    triggerEvent('.tooltipper', 'mouseleave');
    triggerEvent('.tooltipper', 'mouseenter');

    await waitFor('.tooltipper');

    assert
      .dom('.tooltipper')
      .containsText(
        'Loading...',
        'tooltipper knows it is *still* loading the tooltip'
      );

    deferred.resolve({ greeting: 'Hello World' });

    await settled();

    assert
      .dom('.tooltip')
      .containsText('Hello World', 'the loaded data is passed to the tooltip');

    await triggerEvent('.tooltipper', 'mouseleave');

    await waitForAnimation('.tooltip');

    await settled();

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.verifySteps(
      ['load tooltip'],
      'load is not called on a subsequent render of the tooltip'
    );

    assert
      .dom('.tooltip')
      .containsText('Hello World', 'the loaded data is still present');
  });
});
