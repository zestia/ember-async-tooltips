import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { focus, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('focusing', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <Tooltipper @tooltip={{component "tooltip"}}>
        <a href="#">Focus me</a>
      </Tooltipper>
    `);

    await focus('.tooltipper > a');

    assert
      .dom('.tooltip')
      .doesNotExist(
        'tooltips are not displayed when focus enters a tooltipper by default.' +
          'this can be implemented on a per-project basis by using the yielded API'
      );
  });
});
