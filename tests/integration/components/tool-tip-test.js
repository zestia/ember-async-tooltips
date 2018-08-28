import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ToolTipComponent from '@zestia/ember-async-tooltips/components/tool-tip';

module('tool-tip', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(4);

    await render(hbs`{{tool-tip text="Hello World"}}`);

    const el = find('.tooltip');

    assert.ok(el,
      'tooltips have an appropriate class name');

    assert.ok(el.classList.contains('is-showing'),
      'a tooltip will be showing by default (to animate itself in)');

    assert.equal(el.getAttribute('role'), 'tooltip',
      'tooltip components have a suitable aria role');

    assert.equal(el.innerHTML, 'Hello World',
      'renders value of text attribute');
  });

  test('on insert action', async function(assert) {
    assert.expect(1);

    this.set('inserted', tooltip => {
      assert.ok(tooltip instanceof ToolTipComponent,
        'when a tooltip is inserted into the DOM, it sends an action with a ' +
        'reference to itself');
    });

    await render(hbs`{{tool-tip _onInsert=(action inserted)}}`);
  });

  test('on mouse leave action', async function(assert) {
    assert.expect(1);

    this.set('mouseExited', function() {
      assert.ok(true, 'when a the mouse leaves a tooltip it sends an action');
    });

    await render(hbs`{{tool-tip _onMouseLeave=(action mouseExited)}}`);

    await triggerEvent('.tooltip', 'mouseout');
  });
});
