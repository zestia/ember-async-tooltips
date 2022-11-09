import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { focus, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tooltip | focus', function (hooks) {
  setupTooltipperTest(hooks);

  test('focusing', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <a href="#">
        <Tooltip />
      </a>
    `);

    await focus('.tooltipper');

    assert.dom('.tooltip').doesNotExist(
      `
      tooltips are not displayed when focus enters a reference element by default.
      though many browsers will display it on touch
      `
    );
  });
});
