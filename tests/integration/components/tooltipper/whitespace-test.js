import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('whitespace', async function (assert) {
    assert.expect(1);

    await render(hbs`<Tooltipper @tooltip={{component "tooltip"}} />`);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.notOk(
      this.element.innerHTML.match(/\s{2,}/),
      'should not render unnecessary whitespace'
    );
  });
});
