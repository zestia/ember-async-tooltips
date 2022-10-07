import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent, getRootElement } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('custom position', async function (assert) {
    assert.expect(3);

    getRootElement().parentNode.classList.add('full-screen');

    this.position = (referencePosition) => {
      assert.step(
        `computing position based on reference position: ${referencePosition}`
      );

      return 'left top';
    };

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "tooltip" text="See me"}}
        @position={{this.position}}
      >
        Hover over me
      </Tooltipper>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.verifySteps(
      ['computing position based on reference position: top left'],
      'position argument is executed'
    );

    assert
      .dom('.tooltip')
      .hasAttribute('data-position', 'left top', 'custom position is used');

    getRootElement().parentNode.classList.remove('full-screen');
  });
});
