import { Promise } from 'rsvp';
import Controller from '@ember/controller';
import { run, later } from '@ember/runloop';
import { equal } from '@ember/object/computed';
import { action, set } from '@ember/object';

export default class PositionController extends Controller {
  window = window;

  init() {
    super.init(...arguments);
    set(this, 'showDelay', 500);
    set(this, 'hideDelay', 0);
    set(this, 'loadDelay', 500);
    set(this, 'position', '');
    set(this, 'showTooltipper', true);
  }

  @equal('position', '') adjustDisabled;

  @action
  unload() {
    run(() => this.set('showTooltipper', false));
    run(() => this.set('showTooltipper', true));
  }

  @action
  setPosition({ target: { value } }) {
    set(this, 'position', value);
  }

  @action
  setAdjust({ target: { checked } }) {
    set(this, 'adjust', checked);
  }

  @action
  setShowDelay({ target: { value } }) {
    set(this, 'showDelay', value);
  }

  @action
  setHideDelay({ target: { value } }) {
    set(this, 'hideDelay', value);
  }

  @action
  setLoadDelay({ target: { value } }) {
    set(this, 'loadDelay', value);
  }

  @action
  reposition(e) {
    const [x, y] = this.lastPos;
    const [t, l] = this.startPos;

    const element = e.target;
    const top = y - l;
    const left = x - t;

    element.style.top = `${top}px`;
    element.style.left = `${left}px`;
  }

  @action
  storeStartPos(e) {
    const pos = e.target.getBoundingClientRect();

    set(this, 'startPos', [e.clientX - pos.left, e.clientY - pos.top]);
  }

  @action
  storeLastPos(e) {
    const { clientX: x, clientY: y } = e;

    if (x && y) {
      set(this, 'lastPos', [x, y]);
    }
  }

  @action
  load() {
    set(this, 'isLoading', true);

    return new Promise(resolve => {
      later(() => {
        set(this, 'isLoading', false);
        resolve();
      }, this.loadDelay);
    });
  }
}
