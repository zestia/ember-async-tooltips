import { setupRenderingTest } from 'ember-qunit';
import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';

const CustomTooltip = Component.extend({
  tagName: '',
  layout: hbs`
    <div class="custom-tooltip" ...attributes>
      {{#if @error}}
        {{@error.message}}
      {{else}}
        {{@data.greeting}}
      {{/if}}
    </div>
  `
});

export default function setupTooltipperTest(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('component:custom-tooltip', CustomTooltip);

    this.startTimer = () => (this.startTime = Date.now());

    this.stopTimer = () => (this.stopTime = Date.now());

    this.timeTaken = () => this.stopTime - this.startTime;
  });
}
