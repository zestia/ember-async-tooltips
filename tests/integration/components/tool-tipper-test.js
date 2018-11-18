import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { settled, render, triggerEvent, find } from '@ember/test-helpers';
import { defer } from 'rsvp';
import hbs from 'htmlbars-inline-precompile';

module('tool-tipper', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(3);

    await render(hbs`<ToolTipper />`);

    assert
      .dom('.tooltipper')
      .exists({ count: 1 }, 'tool-tipper components have an appropriate class name');

    assert.equal(find('.tooltipper').tagName, 'SPAN', 'renders as an inline element by default');

    assert.strictEqual(find('.tooltipper').getAttribute('type'), null, 'is not a button');
  });

  test('as a hyperlink', async function(assert) {
    assert.expect(3);

    await render(hbs`{{tool-tipper tagName="a" href="foo" rel="bar" target="baz"}}`);

    assert.dom('.tooltipper').hasAttribute('href', 'foo', 'can set href attribute');

    assert.dom('.tooltipper').hasAttribute('rel', 'bar', 'can set rel attribute');

    assert.dom('.tooltipper').hasAttribute('target', 'baz', 'can set target attribute');
  });

  test('as a button', async function(assert) {
    assert.expect(2);

    await render(hbs`{{tool-tipper tagName="button"}}`);

    assert
      .dom('.tooltipper')
      .hasAttribute('type', 'button', 'renders as a non-submittion button by default');

    await render(hbs`{{tool-tipper tagName="button" type="foo"}}`);

    assert.dom('.tooltipper').hasAttribute('type', 'foo', 'can specify type of button');
  });

  test('tabindex', async function(assert) {
    assert.expect(2);

    await render(hbs`<ToolTipper />`);

    assert.strictEqual(find('.tooltipper').getAttribute('tabindex'), null, 'no default tabindex');

    await render(hbs`{{tool-tipper tabindex="-1"}}`);

    assert.strictEqual(
      find('.tooltipper').getAttribute('tabindex'),
      '-1',
      'can set tabindex attribute'
    );
  });

  test('onLoad action', async function(assert) {
    assert.expect(3);

    let count = 0;

    const deferred = defer();

    this.set('load', () => {
      count++;
      return deferred.promise;
    });

    await render(hbs`<ToolTipper @onLoad={{action this.load}} />`);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.dom('.tooltipper').hasClass('is-loading', 'has a loading class whilst loading the data');

    deferred.resolve();

    await settled();

    assert.ok(
      !find('.tooltipper').classList.contains('is-loading'),
      'loading class is removed when loading is complete'
    );

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.equal(count, 1, 'only loads once');
  });
});
