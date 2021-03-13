import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('changing position', async function (assert) {
    assert.expect(4);

    this.position = 'top center';

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "tooltip" text="See me"}}
        @position={{this.position}}
      >
        Hover over me
      </Tooltipper>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert
      .dom('.tooltip')
      .hasClass('tooltip--top-center', 'has initial position class name');

    assert.dom('.tooltip').hasStyle(
      {
        left: '16.3281px',
        top: '-6px'
      },
      'has top center coords set'
    );

    this.set('position', 'bottom center');

    assert
      .dom('.tooltip')
      .hasClass('tooltip--bottom-center', 'position class name is recomputed');

    assert.dom('.tooltip').hasStyle(
      {
        left: '16.3281px',
        top: '14px'
      },
      'coordinates are recomputed to bottom center'
    );
  });
});
