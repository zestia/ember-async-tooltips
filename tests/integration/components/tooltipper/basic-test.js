import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupRenderingTest(hooks);

  test('basic rendering test', async function (assert) {
    assert.expect(4);

    await render(hbs`<Tooltipper class="example-tooltipper" />`);

    assert
      .dom('.example-tooltipper')
      .hasText(
        /^$/,
        'splats attributes, and renders text argument with correct whitespace'
      );

    assert
      .dom('.example-tooltipper')
      .hasClass('tooltipper', 'has an appropriate class name');

    const [id] = find('.tooltipper').getAttribute('id').match(/\d+/);

    assert
      .dom('.tooltipper')
      .hasAttribute(
        'id',
        `tooltipper-${id}`,
        'has an appropriate id attribute'
      );

    assert
      .dom('.tooltipper')
      .hasAttribute(
        'aria-describedby',
        `tooltip-${id}`,
        'this tooltipper will be described by a tooltip with the same identifer'
      );
  });
});
