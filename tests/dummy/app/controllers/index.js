import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { next, later } from '@ember/runloop';
import { Promise } from 'rsvp';

export default class IndexController extends Controller {
  @tracked span;
  @tracked tr;
  @tracked showDelay = 250;
  @tracked hideDelay = 0;
  @tracked loadDelay = 1000;
  @tracked isLoading = false;
  @tracked isLoaded = false;
  @tracked showTooltipper = true;
  @tracked position = 'top left';

  get totalDelay() {
    if (this.useAdjustedLoadDelay) {
      return this.adjustedDelay;
    } else {
      return this.showDelay;
    }
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

  get tooltipText() {
    if (/^top/.test(this.position)) {
      return '⬇️';
    } else if (/^bottom/.test(this.position)) {
      return '⬆️';
    } else if (/^left/.test(this.position)) {
      return '➡️';
    } else if (/^right/.test(this.position)) {
      return '⬅️';
    } else {
      return '';
    }
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
  setPosition({ target: { value } }) {
    this.position = value;
  }

  @action
  registerSpan(element) {
    this.span = element;
  }

  @action
  registerTableRow(element) {
    this.tr = element;
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
