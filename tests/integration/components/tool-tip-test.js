import { test, moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import ToolTipComponent from 'ember-async-tooltips/components/tool-tip';


moduleForComponent('tool-tip', {
  integration: true
});



test('it renders', function(assert) {
  assert.expect(4);

  this.render(hbs`{{tool-tip text='Hello World'}}`);

  const $el = this.$('.tooltip');

  assert.equal($el.length, 1,
    'tooltips have an appropriate class name');

  assert.ok($el.hasClass('is-showing'),
    'a tooltip will be showing by default (to animate itself in)');

  assert.equal($el.attr('role'), 'tooltip',
    'tooltip components have a suitable aria role');

  assert.equal(this.$('.tooltip').html(), 'Hello World',
    'renders value of text attribute');
});



test('on insert action', function(assert) {
  assert.expect(1);

  this.on('inserted', function(tooltip) {
    assert.ok(tooltip instanceof ToolTipComponent,
      'when a tooltip is inserted into the DOM, it sends an action with a ' +
      'reference to itself');
  });

  this.render(hbs`{{tool-tip on-insert=(action 'inserted')}}`);
});



test('on mouse leave action', function(assert) {
  assert.expect(1);

  this.on('mouseExited', function() {
    assert.ok(true,
      'when a the mouse leaves a tooltip it sends an action');
  });

  this.render(hbs`{{tool-tip on-mouse-leave=(action 'mouseExited')}}`);

  this.$('.tooltip').trigger('mouseout');
});
