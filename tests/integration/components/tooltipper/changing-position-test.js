import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('changing position', async function (assert) {
    assert.expect(4);

    this.set('position', 'top right');

    await render(hbs`
      <Tooltipper
        @tooltip={{component "tooltip"}}
        @position={{this.position}} />
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert
      .dom('.tooltip')
      .hasClass('tooltip--top-right', 'has initial position class name');

    assert.dom('.tooltip').hasStyle(
      {
        top: '-5px',
        left: '30px',
      },
      'has top right coords set'
    );

    this.set('position', 'bottom right');

    assert
      .dom('.tooltip')
      .hasClass('tooltip--bottom-right', 'position class name is recomputed');

    assert.dom('.tooltip').hasStyle(
      {
        top: '20px',
        left: '30px',
      },
      'coordinates are recomputed to bottom right'
    );
  });
});
