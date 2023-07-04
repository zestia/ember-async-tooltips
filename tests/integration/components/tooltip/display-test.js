import { module, test } from 'qunit';
import setupTooltipperTest from 'dummy/tests/integration/components/tooltip/setup';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { htmlSafe } from '@ember/template';

module('tooltip | display', function (hooks) {
  setupTooltipperTest(hooks);

  test('css display none', async function (assert) {
    assert.expect(1);

    this.style = htmlSafe('display: none');

    await render(hbs`
      {{! template-lint-disable no-inline-styles }}
      <div>
        <Tooltip style={{this.style}} />
      </div>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.ok(
      true,
      `
      the position cannot be computed if the element is hidden
      because it will not have an offset parent.
      `
    );
  });
});
