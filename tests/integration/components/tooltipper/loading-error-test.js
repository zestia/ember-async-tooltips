import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('loading error', async function (assert) {
    assert.expect(3);

    const deferred1 = defer();
    const deferred2 = defer();

    this.loadTooltip = () => deferred1.promise;

    this.showTooltip = true;

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "greeting-tooltip"}}
        @showTooltip={{this.showTooltip}}
        @onLoad={{this.loadTooltip}}
      />
    `);

    assert.dom('.tooltip').doesNotExist('not rendered tooltip yet');

    deferred1.reject({ message: 'Failed to load' });

    await settled();

    assert
      .dom('.tooltip')
      .hasText('Failed to load', 'the error is passed to the tooltip');

    this.set('showTooltip', false);

    await settled();

    this.set('loadTooltip', () => deferred2.promise);

    this.set('showTooltip', true);

    await settled();

    deferred2.resolve({ greeting: 'Loaded OK' });

    await settled();

    assert
      .dom('.tooltip')
      .hasText(
        'Loaded OK',
        'if the tooltip failed to load, it can be loaded again'
      );
  });
});
