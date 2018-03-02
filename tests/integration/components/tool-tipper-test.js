import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { settled, render, triggerEvent } from '@ember/test-helpers';
import { defer } from 'rsvp';
import hbs from 'htmlbars-inline-precompile';

module('tool-tipper', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(3);

    await render(hbs`{{tool-tipper}}`);

    assert.equal(this.$('.tooltipper').length, 1,
      'tool-tipper components have an appropriate class name');

    assert.equal(this.$('.tooltipper').prop('tagName'), 'SPAN',
      'renders as an inline element by default');

    assert.strictEqual(this.$('.tooltipper').attr('type'), undefined,
      'is not a button');
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
    assert.expect(3);

    let count = 0;

    const deferred = defer();

    this.set('load', () => {
      count++;
      return deferred.promise;
    });

    await render(hbs`{{tool-tipper on-load=(action load)}}`);

    await triggerEvent('.tooltipper', 'mouseover');

    assert.ok(this.$('.tooltipper').hasClass('is-loading'),
      'has a loading class whilst loading the data');

    deferred.resolve();

    await settled();

    assert.ok(!this.$('.tooltipper').hasClass('is-loading'),
      'loading class is removed when loading is complete');

    await triggerEvent('.tooltipper', 'mouseover');

    assert.equal(count, 1,
      'only loads once');
  });
});
