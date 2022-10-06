import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { waitFor, render, triggerEvent, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('loading attr', async function (assert) {
    assert.expect(3);

    const deferred = defer();

    this.loadTooltip = () => deferred.promise;

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "tooltip"}}
        @onLoad={{this.loadTooltip}}
      />
    `);

    assert
      .dom('.tooltipper')
      .hasAttribute('data-loading', 'false', 'precondition: not loading');

    await triggerEvent('.tooltipper', 'mouseenter');

    assert
      .dom('.tooltipper')
      .hasAttribute(
        'data-loading',
        'true',
        'tooltipper signifies when loading data for the tooltip'
      );

    deferred.resolve();

    await settled();

    assert
      .dom('.tooltipper')
      .hasAttribute(
        'data-loading',
        'false',
        'attribute is reset once data is loaded'
      );
  });
});
