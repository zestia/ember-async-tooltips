import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltip', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);

    await render(hbs`
      <Tooltip
        class="foo-tooltip"
        @text="Hello World" />
    `);

    assert
      .dom('.foo-tooltip')
      .hasText(
        /^Hello World$/,
        'splats attributes, and renders text argument with correct whitespace'
      );

    assert
      .dom('.foo-tooltip')
      .doesNotHaveClass(
        'tooltip',
        "is a component that can be used as a tooltip, but currently isn't one"
      );
  });
});
