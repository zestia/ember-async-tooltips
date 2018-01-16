import { test, moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('tool-tipper', {
  integration: true
});



test('it renders', function(assert) {
  assert.expect(2);

  this.render(hbs`{{tool-tipper}}`);

  assert.equal(this.$('.tooltipper').length, 1,
    'tool-tipper components have an appropriate class name');

  assert.equal(this.$('.tooltipper').prop('tagName'), 'SPAN',
    'renders as an inline element by default');
});


test('as a hyperlink', function(assert) {
  assert.expect(3);

  this.render(hbs`
    {{tool-tipper tagName="a" href="foo" rel="bar" target="baz"}}
  `);

  assert.equal(this.$('.tooltipper').attr('href'), 'foo',
    'can set href attribute');

  assert.equal(this.$('.tooltipper').attr('rel'), 'bar',
    'can set rel attribute');

  assert.equal(this.$('.tooltipper').attr('target'), 'baz',
    'can set target attribute');
});


test('as a button', function(assert) {
  assert.expect(2);

  this.render(hbs`{{tool-tipper tagName="button"}}`);

  assert.equal(this.$('.tooltipper').attr('type'), 'button',
    'renders as a non-submittion button by default');

  this.render(hbs`{{tool-tipper tagName="button" type="foo"}}`);

  assert.equal(this.$('.tooltipper').attr('type'), 'foo',
    'can specify type of button');
});


test('tabindex', function(assert) {
  assert.expect(2);

  this.render(hbs`{{tool-tipper}}`);

  assert.strictEqual(this.$('.tooltipper').attr('tabindex'), undefined,
    'no default tabindex');

  this.render(hbs`{{tool-tipper tabindex=-1}}`);

  assert.strictEqual(this.$('.tooltipper').attr('tabindex'), '-1',
    'can set tabindex attribute');
});
