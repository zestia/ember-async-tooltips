import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, waitFor } from '@ember/test-helpers';
import Tooltip from '#src/components/tooltip';
import { trackedObject } from '@ember/reactive/collections';

module('tooltip | Side detection', function (hooks) {
  setupRenderingTest(hooks);

  test('it applies a data-side attribute', async function (assert) {
    assert.expect(4);

    const state = trackedObject({ class: 'top' });

    await render(
      <template>
        {{! template-lint-disable no-forbidden-elements }}
        <style>
          .top {
            position-area: top;
          }

          .bottom {
            position-area: bottom;
          }

          .left {
            position-area: left;
          }

          .right {
            position-area: right;
          }
        </style>

        <div>
          <Tooltip class={{state.class}} @show={{true}} @usePopover={{true}} />
        </div>
      </template>
    );

    assert.dom('.tooltip').hasAttribute('data-side', 'top');

    state.class = 'bottom';

    await waitFor(".tooltip[data-side='bottom']");

    assert.dom('.tooltip').hasAttribute('data-side', 'bottom');

    state.class = 'left';

    await waitFor(".tooltip[data-side='left']");

    assert.dom('.tooltip').hasAttribute('data-side', 'left');

    state.class = 'right';

    await waitFor(".tooltip[data-side='right']");

    assert.dom('.tooltip').hasAttribute('data-side', 'right');
  });
});
