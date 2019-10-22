import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';

module('tooltipper', function(hooks) {
  setupTooltipperTest(hooks);

  test('loading error', async function(assert) {
    assert.expect(2);

    const deferred = defer();

    this.loadTooltip = () => deferred.promise;

    await render(hbs`
      <Tooltipper
        @showTooltip={{true}}
        @onLoad={{this.loadTooltip}}
        @tooltip={{component "custom-tooltip"}} />
    `);

    assert.dom('.tooltip').doesNotExist('not rendered tooltip yet');

    deferred.reject({ message: 'Failed to load' });

    await settled();

    assert
      .dom('.tooltip')
      .hasText('Failed to load', 'the error is passed to the tooltip');
  });
});
