import { find } from '@ember/test-helpers';

export default function waitForAnimation(selector, animation) {
  return new Promise((resolve) => {
    function handler(event) {
      if (!animation || animation === event.animationName) {
        resolve();
      }
    }

    find(selector).addEventListener('animationend', handler, { once: true });
  });
}
