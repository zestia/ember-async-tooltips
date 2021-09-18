import { waitUntil } from '@ember/test-helpers';
import { getWaiters } from '@ember/test-waiters';

export default function waitForWaiter(name) {
  return waitUntil(() => {
    const waiter = getWaiters().find((waiter) => {
      return waiter.name === name;
    });
    return waiter ? waiter.waitUntil() : false;
  });
}
