import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { focus, render } from '@ember/test-helpers';
import Tooltip from '@zestia/ember-async-tooltips/components/tooltip';

module('tooltip | focus', function (hooks) {
  setupRenderingTest(hooks);

  test('focusing', async function (assert) {
    assert.expect(1);

    await render(<template>
      <a href="#">
        <Tooltip />
      </a>
    </template>);

    await focus('.tooltipper');

    assert.dom('.tooltip').doesNotExist(
      `
      tooltips are not displayed when focus enters a reference element by default.
      though many browsers will display it on touch
      `
    );
  });
});
