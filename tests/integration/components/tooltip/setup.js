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

    this.getPosition = (selector) => {
      const style = getComputedStyle(find(selector));

      return {
        left: parseInt(style.left, 10),
        top: parseInt(style.top, 10)
      };
    };

    this.assertPosition = (selector, expected) => {
      const position = this.getPosition(selector);

      assert.strictEqual(position.left, expected.left);
      assert.strictEqual(position.top, expected.top);
    };
  });
}
