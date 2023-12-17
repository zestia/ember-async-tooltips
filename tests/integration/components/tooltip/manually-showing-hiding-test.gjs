import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, settled } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import Tooltip from '@zestia/ember-async-tooltips/components/tooltip';

module('tooltip | manual', function (hooks) {
  setupRenderingTest(hooks);

  test('manually showing / hiding test', async function (assert) {
    assert.expect(3);

    const state = new (class {
      @tracked show;
    })();

    await render(<template>
      <div>
        <Tooltip @show={{state.show}} />
      </div>
    </template>);

    assert.dom('.tooltip').doesNotExist();

    state.show = true;

    await settled();

    assert.dom('.tooltip').exists();

    state.show = false;

    await settled();

    assert.dom('.tooltip').doesNotExist();
  });
});
