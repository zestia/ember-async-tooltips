import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import setupTooltipperTest from './setup';
import { render, triggerEvent, getRootElement } from '@ember/test-helpers';

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

  test('no position', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <Tooltipper @Tooltip={{component "tooltip" text="See me"}} />
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert
      .dom('.tooltip')
      .hasAttribute('data-position', 'bottom center', 'default');
  });

  test('invalid position', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <Tooltipper
        @Tooltip={{component "tooltip" text="See me"}}
        @position="foo"
      />
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltip').hasAttribute('data-position', 'foo');

    assert
      .dom('.tooltip')
      .hasAttribute('style', 'top: NaNpx; left: NaNpx', 'fails silently');
  });
});
