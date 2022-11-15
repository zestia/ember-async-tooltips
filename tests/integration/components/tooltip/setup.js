import { setupRenderingTest } from 'ember-qunit';
import { find } from '@ember/test-helpers';

export default function setupTooltipperTest(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (assert) {
    this.startTimer = () => (this.startTime = Date.now());

    this.stopTimer = () => (this.stopTime = Date.now());

    this.timeTaken = () => this.stopTime - this.startTime;

    this.assertPosition = (selector, expected) => {
      const style = getComputedStyle(find(selector));

      assert.strictEqual(parseInt(style.left, 10), expected.left);
      assert.strictEqual(parseInt(style.top, 10), expected.top);
    };
  });
}
