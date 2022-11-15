import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, settled, triggerEvent } from '@ember/test-helpers';
import { waitForFrame } from '@zestia/animation-utils';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | reposition', function (hooks) {
  setupTooltipperTest(hooks);

  hooks.beforeEach(function () {
    this.tooltipService = this.owner.lookup('service:tooltip');
  });

  test('reposition', async function (assert) {
    assert.expect(4);

    this.text = 'Hello';

    await render(hbs`
      <div>
        <Tooltip @position="bottom center">
          {{this.text}}
        </Tooltip>
      </div>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    this.assertPosition('.tooltip', { left: -4, top: 11 });

    this.set('text', 'Hello World');

    await settled();
    await waitForFrame();

    this.assertPosition('.tooltip', { left: -15, top: 11 });
  });
});
