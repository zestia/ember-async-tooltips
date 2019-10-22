import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { reject } from 'rsvp';
import { settled } from '@ember/test-helpers';
import { run } from '@ember/runloop';

module('service:error-handling', function(hooks) {
  setupTest(hooks);

  const error = new Error('foo');

  let errorHandlingService;
  let capturedException;

  hooks.beforeEach(function() {
    errorHandlingService = this.owner.lookup('service:error-handling');
    errorHandlingService.onError = error => (capturedException = error);
  });

  module('run loop', function() {
    test('normal behaviour', function(assert) {
      assert.expect(3);

      errorHandlingService.squelch(() => false);

      assert.throws(() => {
        run(() => {
          throw error;
        });
      }, 'errors throw');

      assert.strictEqual(capturedException, error, 'fires onError');

      assert.deepEqual(
        errorHandlingService.squelched,
        [],
        'error is not squelched'
      );
    });

    test('squelching', function(assert) {
      assert.expect(2);

      errorHandlingService.squelch(() => true);

      run(() => {
        throw error;
      });

      assert.deepEqual(capturedException, error, 'fires onError');

      assert.deepEqual(
        errorHandlingService.squelched,
        [error],
        'error is squelched'
      );
    });
  });

  module('unhandled promise rejections', function() {
    test('normal behaviour', function(assert) {
      assert.expect(2);

      errorHandlingService.squelch(() => false);

      assert.rejects(reject(error), 'errors throw');

      // How to test this? Error has already been caught by QUnit
      // assert.deepEqual(capturedException, error, 'fires onError');

      assert.deepEqual(
        errorHandlingService.squelched,
        [],
        'error is not squelched'
      );
    });

    test('squelching', async function(assert) {
      assert.expect(2);

      errorHandlingService.squelch(() => true);

      reject(error);

      await settled();

      assert.deepEqual(capturedException, error, 'fires onError');

      assert.deepEqual(
        errorHandlingService.squelched,
        [error],
        'error is squelched'
      );
    });
  });
});
