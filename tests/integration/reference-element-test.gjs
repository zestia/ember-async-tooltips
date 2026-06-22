import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, triggerEvent } from '@ember/test-helpers';
import { trackedObject } from '@ember/reactive/collections';
import Tooltip from '#src/components/tooltip';

module('tooltip | reference', function (hooks) {
  setupRenderingTest(hooks);

  test('can specify a reference element to attach to', async function (assert) {
    assert.expect(4);

    const state = trackedObject({ referenceElement: null });

    await render(
      <template>
        <div class="parent">
          <Tooltip @element={{state.referenceElement}} />
        </div>

        <div class="reference-element-1"></div>
        <div class="reference-element-2"></div>
      </template>
    );

    // HTMLElement

    state.referenceElement = find('.reference-element-1');

    await triggerEvent('.reference-element-1', 'mouseenter');

    assert.dom('.parent > .tooltip').exists();

    await triggerEvent('.reference-element-1', 'mouseleave');

    assert.dom('.tooltip').doesNotExist();

    // Selector

    state.referenceElement = '.reference-element-2';

    await triggerEvent('.reference-element-1', 'mouseenter');

    assert.dom('.parent > .tooltip').doesNotExist();

    await triggerEvent('.reference-element-1', 'mouseleave');
    await triggerEvent('.reference-element-2', 'mouseenter');

    assert.dom('.parent > .tooltip').exists();
  });

  test('invalid element', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <div>
          <Tooltip @element="#missing" />
        </div>
      </template>
    );

    await triggerEvent('div', 'mouseenter');

    assert.dom('.tooltip').doesNotExist();
    assert.dom('.tooltipper').doesNotExist();
  });
});
