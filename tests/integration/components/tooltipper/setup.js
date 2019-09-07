import { setupRenderingTest } from 'ember-qunit';
import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';

const FooTooltip = Component.extend({
  tagName: '',
  layout: hbs`<div ...attributes>Hello {{@data.name}}</div>`
});

export default function setupTooltipperTest(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('component:foo-tooltip', FooTooltip);
  });
}
