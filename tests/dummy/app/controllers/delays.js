/* eslint-disable ember/no-runloop */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { next, later } from '@ember/runloop';
const { max } = Math;

export default class DelaysController extends Controller {
  @tracked isEager = true;
  @tracked showDelay = 500;
  @tracked hideDelay = 0;
  @tracked loadDuration = 200;
  @tracked isLoading = false;
  @tracked isLoaded = false;
  @tracked showTooltipper = true;

  get isLazy() {
    return !this.isEager;
  }

  get showLoading() {
    return this.isEager && this.isLoading && this.loadDuration > 0;
  }

  get totalPossibleDelay() {
    return this.loadDuration + this.showDelay;
  }

  get totalDelay() {
    if (this.isEager) {
      if (this.loadDuration > this.showDelay) {
        return this.loadDuration;
      } else {
        return this.showDelay;
      }
    }

    return this.totalPossibleDelay;
  }

  get timeSaved() {
    if (this.isEager) {
      if (this.loadDuration > this.showDelay) {
        return this.showDelay;
      } else {
        return this.loadDuration;
      }
    }

    return 0;
  }

  get actualShowDelay() {
    if (this.isEager) {
      return max(this.showDelay - this.loadDuration, 0);
    }

    return this.showDelay;
  }

  @action
  setEager({ target: { checked } }) {
    this.isEager = checked;
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
  setLoadDuration({ target: { value } }) {
    this.loadDuration = parseInt(value || 0, 10);
  }

  @action
  load() {
    this.isLoading = true;

    return new Promise((resolve) => {
      later(() => {
        this.isLoading = false;
        this.isLoaded = true;
        resolve({ message: 'Hello World' });
      }, this.loadDuration);
    });
  }

  @action
  unload() {
    this.showTooltipper = false;
    this.isLoaded = false;
    next(() => (this.showTooltipper = true));
  }
}
