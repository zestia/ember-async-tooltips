import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberResolver from 'ember-resolver';
import waitForAnimation from '../../../helpers/wait-for-animation';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('changing content', async function (assert) {
    assert.expect(2);

    this.text = 'Hello';

    await render(hbs`
      <Tooltipper
        @tooltip={{component "tooltip" text=this.text}}
        @position="bottom right"
      >
        Hover over me
      </Tooltipper>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltip').hasStyle(
      {
        top: '13px',
        left: '34.2109px'
      },
      'initial position'
    );

    // Here, we change the text, and should expect
    // that the tooltip is re-positioned, as if the
    // user had mouse'd out and back in again.
    // await triggerEvent('.tooltipper', 'mouseleave');
    // await waitForAnimation('.tooltip');
    // await triggerEvent('.tooltipper', 'mouseenter');
    this.set('text', this.text.repeat(10));

    assert.dom('.tooltip').hasStyle(
      {
        top: '13px',
        left: '-125.75px'
      },
      'tooltip is re-positioned'
    );
  });
});
