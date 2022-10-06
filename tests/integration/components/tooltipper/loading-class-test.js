import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('aria busy', async function (assert) {
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
      .hasAttribute('aria-busy', 'false', 'precondition: not loading');

    await triggerEvent('.tooltipper', 'mouseenter');

    assert
      .dom('.tooltipper')
      .hasAttribute(
        'aria-busy',
        'true',
        'tooltipper signifies when loading data for the tooltip'
      );

    deferred.resolve();

    await settled();

    assert
      .dom('.tooltipper')
      .hasAttribute(
        'aria-busy',
        'false',
        'attribute is reset once data is loaded'
      );
  });
});
