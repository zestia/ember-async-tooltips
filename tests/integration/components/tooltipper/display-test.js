import { module, skip } from 'qunit';
import setupTooltipperTest from './setup';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { htmlSafe } from '@ember/template';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  // No longer testable now we're using test-waiters
  // The test waiters wait for the animation, but it will never
  // animate due to display none on the parent.
  // This scenario is guarded against (and tested) in the position utils library though.
  skip('display', async function (assert) {
    assert.expect(1);

    this.style = htmlSafe('display: none');

    await render(hbs`
      {{! template-lint-disable no-inline-styles }}
      <Tooltipper @Tooltip={{component "tooltip"}} style={{this.style}} />
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
