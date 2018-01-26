import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('tool-tipper', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);

    await render(hbs`{{tool-tipper}}`);

    assert.equal(this.$('.tooltipper').length, 1,
      'tool-tipper components have an appropriate class name');

    assert.equal(this.$('.tooltipper').prop('tagName'), 'SPAN',
      'renders as an inline element by default');
  });

  test('as a hyperlink', async function(assert) {
    assert.expect(3);

    await render(hbs`{{tool-tipper tagName="a" href="foo" rel="bar" target="baz"}}`);

    assert.equal(this.$('.tooltipper').attr('href'), 'foo',
      'can set href attribute');

    assert.equal(this.$('.tooltipper').attr('rel'), 'bar',
      'can set rel attribute');

    assert.equal(this.$('.tooltipper').attr('target'), 'baz',
      'can set target attribute');
  });

  test('as a button', async function(assert) {
    assert.expect(2);

    await render(hbs`{{tool-tipper tagName="button"}}`);

    assert.equal(this.$('.tooltipper').attr('type'), 'button',
      'renders as a non-submittion button by default');

    await render(hbs`{{tool-tipper tagName="button" type="foo"}}`);

    assert.equal(this.$('.tooltipper').attr('type'), 'foo',
      'can specify type of button');
  });

  test('tabindex', async function(assert) {
    assert.expect(2);

    await render(hbs`{{tool-tipper}}`);

    assert.strictEqual(this.$('.tooltipper').attr('tabindex'), undefined,
      'no default tabindex');

    await render(hbs`{{tool-tipper tabindex=-1}}`);

    assert.strictEqual(this.$('.tooltipper').attr('tabindex'), '-1',
      'can set tabindex attribute');
  });

  test('on-load action', async function(assert) {
    assert.expect(1);

    let loaded;

    this.set('load', () => loaded = true);

    await render(hbs`{{tool-tipper on-load=(action load)}}`);

    await triggerEvent('.tooltipper', 'mouseover');

    assert.strictEqual(loaded, true,
      'fires an onload action when moused over');

    await render(hbs`{{tool-tipper}}`);

    await triggerEvent('.tooltipper', 'mouseover');
  });
});
