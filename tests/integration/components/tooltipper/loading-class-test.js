import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('loading class', async function (assert) {
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
      .doesNotHaveClass(
        'tooltipper--loading',
        'precondition: no loading class'
      );

    await triggerEvent('.tooltipper', 'mouseenter');

    assert
      .dom('.tooltipper')
      .hasClass(
        'tooltipper--loading',
        'tooltipper has a loading class when loading data for the tooltip'
      );

    deferred.resolve();

    await settled();

    assert
      .dom('.tooltipper')
      .doesNotHaveClass(
        'tooltipper--loading',
        'loading class is removed once data is loaded'
      );
  });
});
