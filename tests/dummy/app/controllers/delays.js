import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { next, later } from '@ember/runloop';
import { Promise } from 'rsvp';

export default class DelaysController extends Controller {
  @tracked showDelay = 500;
  @tracked hideDelay = 0;
  @tracked loadDelay = 1000;
  @tracked isLoading = false;
  @tracked isLoaded = false;
  @tracked showTooltipper = true;

  get totalDelay() {
    if (this.useAdjustedLoadDelay) {
      return this.adjustedDelay;
    } else {
      return this.showDelay;
    }
  }

  get expectedDelay() {
    return this.showDelay + this.loadDelay;
  }

  get useAdjustedLoadDelay() {
    return !this.isLoaded && this.loadDelayGreaterThanShowDelay;
  }

  get loadDelayGreaterThanShowDelay() {
    return this.loadDelay > this.showDelay;
  }

  get adjustedDelay() {
    return this.loadDelayMinusShowDelay + this.showDelay;
  }

  get loadDelayMinusShowDelay() {
    return this.loadDelay - this.showDelay;
  }

  @action
  setShowDelay({ target: { value } }) {
    this.showDelay = parseInt(value || 0, 10);
  }

  @action
  setHideDelay({ target: { value } }) {
    this.hideDelay = parseInt(value || 0, 10);
  }

  @action
  setLoadDelay({ target: { value } }) {
    this.loadDelay = parseInt(value || 0, 10);
  }

  @action
  load() {
    this.isLoading = true;

    return new Promise((resolve) => {
      later(() => {
        this.isLoading = false;
        this.isLoaded = true;
        resolve();
      }, this.loadDelay);
    });
  }

  @action
  unload() {
    this.showTooltipper = false;
    this.isLoaded = false;
    next(() => (this.showTooltipper = true));
  }
}
