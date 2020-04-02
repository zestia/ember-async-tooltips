import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

export default function setupTooltipperTest(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    const template = hbs`
      <div class="custom-tooltip" ...attributes>
        {{#if @error}}
          {{@error.message}}
        {{else}}
          {{@data.greeting}}
        {{/if}}
      </div>
    `;

    this.owner.register('template:components/custom-tooltip', template);

    this.startTimer = () => (this.startTime = Date.now());

    this.stopTimer = () => (this.stopTime = Date.now());

    this.timeTaken = () => this.stopTime - this.startTime;
  });
}
