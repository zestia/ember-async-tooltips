import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { focus, render, blur, click, triggerEvent } from '@ember/test-helpers';
import Tooltip from '@zestia/ember-async-tooltips/components/tooltip';
import { uniqueId } from '@ember/helper';

module('tooltip | focus', function (hooks) {
  setupRenderingTest(hooks);

  test('focusing (default)', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <a href="#">
          <Tooltip />
        </a>
      </template>,
    );

    await focus('.tooltipper');

    assert.dom('.tooltip').doesNotExist(
      `
      tooltips are not displayed when focus enters a reference element by default.
      though many browsers will display it on touch
      `,
    );
  });

  test('focusing (@useFocus)', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <a href="#">
          <Tooltip @useFocus={{true}} />
        </a>
      </template>,
    );

    await focus('.tooltipper');

    assert.dom('.tooltip').exists(
      `
      tooltips are displayed when focus enters a reference element if @useFocus is true.
      `,
    );

    await blur('.tooltipper');

    assert.dom('.tooltip').doesNotExist();
  });

  test('focusing a tooltip with interactive children (@useFocus)', async function (assert) {
    assert.expect(3);

    await render(
      <template>
        <div class="tooltipper" tabindex="0">
          <Tooltip @useFocus={{true}}>
            Hello
            <a href="#">World</a>
          </Tooltip>
        </div>
      </template>,
    );

    assert.dom('.tooltip').doesNotExist();

    await focus('.tooltipper');

    assert.dom('.tooltip').exists();

    await focus('.tooltip a');

    assert
      .dom('.tooltip')
      .exists('it does not hide the tooltip when focusing within the tooltip');
  });

  test('focusing a tooltip with interactive children rendered in a different output destination (@useFocus)', async function (assert) {
    assert.expect(3);

    await render(
      <template>
        <div class="tooltipper" tabindex="0">
          <Tooltip @useFocus={{true}} @destination="#portal">
            Hello
            <a href="#">World</a>
          </Tooltip>
        </div>

        <div id="portal">
          {{! tooltip rendered here }}
        </div>
      </template>,
    );

    assert.dom('.tooltip').doesNotExist();

    await focus('.tooltipper');

    assert.dom('.tooltip').exists();

    await focus('.tooltip a');

    assert
      .dom('.tooltip')
      .exists('it does not hide the tooltip when focusing within the tooltip');
  });

  test('focusing by clicking (@useFocus)', async function (assert) {
    assert.expect(3);

    await render(
      <template>
        <button type="button">
          <Tooltip @useFocus={{true}} />
        </button>
      </template>,
    );

    await click('.tooltipper');

    assert.dom('.tooltip').exists(
      `
      tooltips are displayed when element is focused/hovered
      `,
    );

    await triggerEvent('.tooltipper', 'mouseleave');

    assert.dom('.tooltipper').isFocused();

    assert
      .dom('.tooltip')
      .doesNotExist(
        'it hides the tooltip when the mouse leaves the reference element, even if the reference element is still focused and @useFocus is true',
      );
  });

  test('focusing a tooltip that has interactive children by clicking (@useFocus)', async function (assert) {
    assert.expect(4);

    await render(
      <template>
        {{#let (uniqueId) as |id|}}
          <button type="button" id={{id}} />
          <Tooltip @useFocus={{true}} @element="#{{id}}">
            Hello
            <a href="#">World</a>
          </Tooltip>
        {{/let}}
      </template>,
    );

    assert.dom('.tooltip').doesNotExist();

    await click('.tooltipper');

    assert.dom('.tooltip').exists();

    await focus('.tooltip a');

    assert
      .dom('.tooltip')
      .exists('it does not hide the tooltip when focusing within the tooltip');

    await triggerEvent('.tooltipper', 'mouseleave');

    assert
      .dom('.tooltip')
      .exists(
        'it does not hide the tooltip when the mouse leaves the reference element, if the interactive content inside of the tooltip has focus',
      );
  });
});
