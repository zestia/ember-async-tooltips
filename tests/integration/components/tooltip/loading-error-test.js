import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, settled, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';

module('tooltip | loading error', function (hooks) {
  setupTooltipperTest(hooks);

  test('loading error', async function (assert) {
    assert.expect(3);

    this.deferred1 = defer();
    this.deferred2 = defer();

    this.loadTooltip = () => this.deferred1.promise;

    await render(hbs`
      <div>
        <Tooltip @onLoad={{this.loadTooltip}} as |tooltip|>
          {{#if tooltip.data}}
            {{tooltip.data.greeting}}
          {{else}}
            {{tooltip.error.message}}
          {{/if}}
        </Tooltip>
      </div>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltip').doesNotExist();

    this.deferred1.reject({ message: 'Failed to load' });

    await settled();

    assert.dom('.tooltip').hasText('Failed to load');

    await triggerEvent('.tooltipper', 'mouseleave');

    this.set('loadTooltip', () => this.deferred2.promise);

    await triggerEvent('.tooltipper', 'mouseenter');

    this.deferred2.resolve({ greeting: 'Loaded OK' });

    await settled();

    assert.dom('.tooltip').hasText('Loaded OK');
  });
});
