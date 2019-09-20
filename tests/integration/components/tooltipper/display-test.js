import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { htmlSafe } from '@ember/string';

module('tooltipper', function(hooks) {
  setupTooltipperTest(hooks);

  test('display', async function(assert) {
    assert.expect(1);

    this.set('style', htmlSafe('display: none'));

    await render(hbs`
      {{! template-lint-disable no-inline-styles }}
      <Tooltipper @tooltip={{component "tooltip"}} style={{this.style}} />
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.ok(
      true,
      'does not throw an error because the position cannot be computed ' +
        'if the tooltipper (or other reference element) is not visible, ' +
        'because it will not have an offset parent'
    );
  });
});
