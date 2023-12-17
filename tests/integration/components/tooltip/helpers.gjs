import { assert } from 'qunit';
import { find } from '@ember/test-helpers';

export class Timer {
  start() {
    this._startTime = Date.now();
    this._stopTime = null;
  }

  stop() {
    this._stopTime = Date.now();
  }

  get time() {
    return this._stopTime - this._startTime;
  }

  assertBetween(lower, upper) {
    assert.ok(this.time >= lower && this.time <= upper);
  }
}

export function hasText(selector, text) {
  return !!find(selector)?.textContent.match(text);
}

export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getPosition(selector) {
  const style = getComputedStyle(find(selector));

  return {
    left: parseInt(style.left, 10),
    top: parseInt(style.top, 10)
  };
}

export function assertPosition(selector, expected) {
  const position = getPosition(selector);

  assert.strictEqual(position.left, expected.left);
  assert.strictEqual(position.top, expected.top);
}
