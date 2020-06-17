import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, click, triggerEvent, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberResolver from 'ember-resolver';
import waitForAnimation from '../../../helpers/wait-for-animation';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('changing content', async function (assert) {
    assert.expect(2);

    this.text = 'Hello';

    this.changeText = (tooltipper) => {
      this.set('text', this.text.repeat(10));
      tooltipper.repositionTooltip();
    };

    await render(hbs`
      <Tooltipper
        @tooltip={{component "tooltip" text=this.text}}
        @position="bottom right"
        as |tooltipper|
      >
        Hover over me

        <br>
        <button type="button" {{on "click" (fn this.changeText tooltipper)}}>
          Hover over me
        </button>
      </Tooltipper>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltip').hasStyle(
      {
        top: '23.5px',
        left: '37.9297px'
      },
      'initial position'
    );

    // Here, we change the text, and should expect
    // that the tooltip is re-positioned, as if the
    // user had mouse'd out and back in again.
    // this.set('text', this.text.repeat(10));
    // await triggerEvent('.tooltipper', 'mouseleave');
    // await waitForAnimation('.tooltip');
    // await triggerEvent('.tooltipper', 'mouseenter');
    await click('button');

    assert.dom('.tooltip').hasStyle(
      {
        top: '23.5px',
        left: '-122.031px'
      },
      'tooltip is re-positioned'
    );
  });
});
