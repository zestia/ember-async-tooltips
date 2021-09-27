import { module, test } from 'qunit';
import setupTooltipperTest from './setup';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import waitForAnimation from '../../../helpers/wait-for-animation';

module('tooltipper', function (hooks) {
  setupTooltipperTest(hooks);

  test('bubbling animations', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <style>
        @keyframes move {
          to {
            transform: translateX(100px);
          }
        }

        .tooltip__child.animate {
          animation: move 100ms forwards;
        }
      </style>

      <Tooltipper
        @showTooltip={{true}}
        @Tooltip={{component "tooltip-with-child-element" text="Hello World"}}
      />
    `);

    find('.tooltip__child').classList.add('animate');

    await waitForAnimation('.tooltip__child', 'move');

    assert.ok(true, 'ignores bubbling child animations');
  });
});
