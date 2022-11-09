import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent, settled } from '@ember/test-helpers';
import { later } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | destroying', function (hooks) {
  setupTooltipperTest(hooks);

  test('destroying a tooltipper when about to show its tooltip', async function (assert) {
    assert.expect(1);

    this.show = true;

    await render(hbs`
      <div>
        {{#if this.show}}
          <Tooltip @showDelay={{1000}} />
        {{/if}}
      </div>
    `);

    triggerEvent('.tooltipper', 'mouseenter');

    await new Promise((resolve) => later(resolve), 500);

    this.set('show', false);

    await settled();

    assert.dom('.tooltip').doesNotExist();
  });
});
