import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, click, render, triggerEvent } from '@ember/test-helpers';
import Tooltip from '@zestia/ember-async-tooltips/components/tooltip';

module('tooltip | click', function (hooks) {
  setupRenderingTest(hooks);

  test('clicking', async function (assert) {
    assert.expect(8);

    await render(
      <template>
        <span class="outside"></span>

        <div class="one">
          <Tooltip @useClick={{true}}>
            one
          </Tooltip>
        </div>
        <div class="two">
          <Tooltip @useClick={{true}}>
            two
          </Tooltip>
        </div>
        <div class="three">
          <Tooltip>
            three
          </Tooltip>
        </div>
      </template>
    );

    // Clicking a tooltip shows it, and hides all others
    // this is because, the default behaviour of mouse out
    // by way of a cursor implies you can only have 1 at a time
    // since you only have one cursor.

    await click('.one');

    assert.dom('.tooltip').exists({ count: 1 }).hasText('one');

    await click('.two');

    assert.dom('.tooltip').exists({ count: 1 }).hasText('two');

    await click('.outside');

    assert.dom('.tooltip').doesNotExist();

    // If a tooltip is clicked, mousing over another tooltip
    // still shows multiple tooltips

    await click('.one');
    await triggerEvent('.three', 'mouseenter');

    assert.dom('.tooltip').exists({ count: 2 });

    const tooltips = findAll('.tooltip');

    assert.dom(tooltips[0]).hasText('one');
    assert.dom(tooltips[1]).hasText('three');
  });
});
