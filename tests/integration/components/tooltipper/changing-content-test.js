import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import Component from '@glimmer/component';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setComponentTemplate } from '@ember/component';
import { modifier } from 'ember-modifier';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('changing content', async function (assert) {
    assert.expect(2);

    const myTooltip = hbs`
      <div class="my-tooltip" {{this.reposition @text}} ...attributes>
        {{@text}}
      </div>
    `;

    const MyTooltip = class extends Component {
      reposition = modifier(this.args.tooltip.reposition);
    };

    this.MyTooltip = setComponentTemplate(myTooltip, MyTooltip);

    this.text = 'Hello';

    await render(hbs`
      <Tooltipper
        @Tooltip={{component (ensure-safe-component this.MyTooltip) text=this.text}}
        @position="bottom center"
      >
        Hover over me
      </Tooltipper>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltip').hasStyle(
      {
        left: '19.1055px',
        top: '14px'
      },
      'initial position'
    );

    // Here, we change the content inside a tooltip,
    // and should expect that the tooltip is re-positioned,
    // as if the user had mouse'd out and back in again.
    //
    // Note that we yield the ability to reposition
    // the tooltip, rather than doing it automatically,
    // because although that would be the ideal, it would
    // require a DOM Mutation Observer and that's a lot of
    // observing, for a situation that rarely occurs.
    //
    // await triggerEvent('.tooltipper', 'mouseleave');
    // await waitForAnimation('.tooltip');
    // await triggerEvent('.tooltipper', 'mouseenter');

    this.set('text', this.text.repeat(10));

    assert.dom('.my-tooltip').hasStyle(
      {
        left: '-60.875px',
        top: '14px'
      },
      'tooltip is re-positioned'
    );
  });
});
