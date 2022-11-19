import { setupRenderingTest } from 'ember-qunit';
import { find } from '@ember/test-helpers';
import { Promise } from 'rsvp';
import { later } from '@ember/runloop';

export default function setupTooltipperTest(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (assert) {
    this.startTimer = () => (this.startTime = Date.now());

    this.stopTimer = () => (this.stopTime = Date.now());

    this.timeTaken = () => this.stopTime - this.startTime;

    this.assertTimeBetween = (lower, upper) => {
      assert.ok(this.timeTaken() >= lower && this.timeTaken() <= upper);
    };

    this.hasText = (selector, text) => {
      return !!find(selector)?.textContent.match(text);
    };

    this.resolve = (data, ms) => {
      return new Promise((resolve) => {
        later(() => resolve(data), ms);
      });
    };

    this.wait = (ms) => this.resolve(null, ms);

    this.assertPosition = (selector, expected) => {
      const style = getComputedStyle(find(selector));

      console.log(style.left, style.top);

      assert.strictEqual(parseInt(style.left, 10), expected.left);
      assert.strictEqual(parseInt(style.top, 10), expected.top);
    };
  });
}
