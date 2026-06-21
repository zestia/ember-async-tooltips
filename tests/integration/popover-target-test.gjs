import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, settled, triggerEvent } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { assertPosition } from '#tests/helpers';
import Tooltip from '#src/components/tooltip';
import { on } from '@ember/modifier';

module('tooltip | popover target', function (hooks) {
  setupRenderingTest(hooks);

  let popoverSource;

  const handleToggle = (event) => {
    popoverSource = event.source;
  };

  const state = new (class {
    @tracked popoverTarget;
    @tracked usePopover;
  })();

  const _render = () => {
    return render(
      <template>
        <style>
          #one,
          #two {
            display: inline-block;
          }
        </style>

        <div class="parent">
          Hover over me<br />
          <span id="one">one</span><br />
          <span id="two">two</span><br />

          <Tooltip
            @usePopover={{state.usePopover}}
            @popoverTarget={{state.popoverTarget}}
            @position="bottom center"
            {{on "toggle" handleToggle}}
          >hi
          </Tooltip>
        </div>
      </template>
    );
  };

  hooks.beforeEach(function () {
    popoverSource = null;
  });

  test('non-popover: display tooltip on mouse over tooltipper, but position it next to another element', async function (assert) {
    assert.expect(7);

    state.popoverTarget = '#one';
    state.usePopover = false;

    await _render();
    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.parent > .tooltip').exists();

    assertPosition('.tooltip', { left: 16, top: 33 });
    assert.strictEqual(popoverSource, null);

    state.popoverTarget = '#two';

    await settled();
    await new Promise(requestAnimationFrame);

    assertPosition('.tooltip', { left: 16, top: 42 });
    assert.strictEqual(popoverSource, null);
  });

  test('popover: display tooltip on mouse over tooltipper, but position it next to another element', async function (assert) {
    assert.expect(3);

    state.popoverTarget = '#one';
    state.usePopover = true;

    await _render();
    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.parent > .tooltip').exists();

    assert.strictEqual(popoverSource, find('#one'));

    state.popoverTarget = '#two';

    await settled();

    assert.strictEqual(popoverSource, find('#two'));
  });
});
