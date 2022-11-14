import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, find, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | reference', function (hooks) {
  setupTooltipperTest(hooks);

  test('can specify a reference element to attach to', async function (assert) {
    assert.expect(4);

    await render(hbs`
      <div class="parent">
        <Tooltip @element={{this.referenceElement}} />
      </div>

      <div class="reference-element-1"></div>
      <div class="reference-element-2"></div>
    `);

    // HTMLElemnt

    this.set('referenceElement', find('.reference-element-1'));

    await triggerEvent('.reference-element-1', 'mouseenter');

    assert.dom('.parent > .tooltip').exists();

    await triggerEvent('.reference-element-1', 'mouseleave');

    assert.dom('.tooltip').doesNotExist();

    // Selector

    this.set('referenceElement', '.reference-element-2');

    await triggerEvent('.reference-element-1', 'mouseenter');

    assert.dom('.parent > .tooltip').doesNotExist();

    await triggerEvent('.reference-element-1', 'mouseleave');
    await triggerEvent('.reference-element-2', 'mouseenter');

    assert.dom('.parent > .tooltip').exists();
  });
});
