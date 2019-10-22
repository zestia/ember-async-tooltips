import Service from '@ember/service';
import Ember from 'ember';
import RSVP from 'rsvp';

/**
 * The Error Handling Service allows us to:
 *
 * 1. Control unhandled exceptions
 * 2. Broadcast when an error occurs
 * 3. Squelch errors
 *
 */
export default class ErrorHandlingService extends Service {
  squelched = [];
  _squelch = [];

  onError() {}

  constructor() {
    super(...arguments);
    this._setupErrorHandling();
  }

  squelch(func) {
    this._squelch.push(func);
  }

  _setupErrorHandling() {
    Ember.onerror = this._errorHandler.bind(this);
    RSVP.on('error', this._errorHandler.bind(this));
  }

  _errorHandler(error) {
    this.onError(error);

    if (this._shouldSquelch(error)) {
      this.squelched.push(error);
    } else {
      throw error;
    }
  }

  _shouldSquelch(error) {
    return this._squelch.some(squelch => squelch(error));
  }
}
