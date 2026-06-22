import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import { modifier } from 'ember-modifier';
import { trackedObject } from '@ember/reactive/collections';
import Tooltip from '#src/components/tooltip';

module('tooltip | destination', function (hooks) {
  setupRenderingTest(hooks);

  test('can specify an output destination', async function (assert) {
    assert.expect(3);

    const state = trackedObject({ elsewhere: null });

    const register = modifier((element) => (state.elsewhere = element));

    await render(
      <template>
        <div>
          <Tooltip @destination={{state.elsewhere}} />
        </div>

        <div class="elsewhere" {{register}}></div>
      </template>
    );

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltipper > .__tooltip__').exists();
    assert.dom('.tooltipper > .tooltip').doesNotExist();
    assert.dom('.elsewhere > .tooltip').exists();
  });
});
