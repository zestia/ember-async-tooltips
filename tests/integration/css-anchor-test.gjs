import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent, find } from '@ember/test-helpers';
import Tooltip from '#src/components/tooltip';

module('tooltip | css anchor', function (hooks) {
  setupRenderingTest(hooks);

  test('css anchor positioning', async function (assert) {
    assert.expect(2);

    // When CSS Anchor positioning is opted into, the tooltipper and the toolip
    // are coupled together via a CSS anchor name. No manual top/left positioning is set.

    await render(
      <template>
        <div><Tooltip @useCSSAnchorPositioning={{true}} /></div>
      </template>
    );

    const [, id] = find('.tooltipper')
      .getAttribute('style')
      .match(/anchor-name: (--[a-zA-Z0-9]+)/);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert
      .dom('.tooltip')
      .hasAttribute('style', `position-anchor: ${id}`)
      .doesNotHaveAttribute('data-position');
  });
});
