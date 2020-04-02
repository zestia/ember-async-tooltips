import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltip', function (hooks) {
  setupRenderingTest(hooks);

  test('basic rendering test', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <Tooltip
        class="example-tooltip"
        @text="Hello World" />
    `);

    assert
      .dom('.example-tooltip')
      .hasText(
        /^Hello World$/,
        'splats attributes, and renders text argument with correct whitespace'
      );

    assert
      .dom('.example-tooltip')
      .doesNotHaveClass(
        'tooltip',
        "is a component that can be used as a tooltip, but currently isn't one"
      );
  });
});
