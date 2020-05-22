import { Promise } from 'rsvp';
import Controller from '@ember/controller';
import { next, later } from '@ember/runloop';
import { equal } from '@ember/object/computed';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PositionController extends Controller {
  window = window;

  @tracked showDelay = 500;
  @tracked hideDelay = 0;
  @tracked loadDelay = 500;
  @tracked position = '';
  @tracked isLoading;
  @tracked adjust;
  @tracked showTooltipper = true;
  @tracked showTooltip = false;

  @equal('position', '') adjustDisabled;

  constructor() {
    super(...arguments);

    document.ondragover = (e) => e.preventDefault(); // Prevent ghost spring back
  }

  @action
  unload() {
    this.showTooltipper = false;
    next(() => (this.showTooltipper = true));
  }

  @action
  setPosition({ target: { value } }) {
    this.position = value;
  }

  @action
  setAdjust({ target: { checked } }) {
    this.adjust = checked;
  }

  @action
  setShowDelay({ target: { value } }) {
    this.showDelay = value;
  }

  @action
  setHideDelay({ target: { value } }) {
    this.hideDelay = value;
  }

  @action
  setLoadDelay({ target: { value } }) {
    this.loadDelay = value;
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

    this.startPos = [e.clientX - pos.left, e.clientY - pos.top];
  }

  @action
  storeLastPos(e) {
    const { clientX: x, clientY: y } = e;

    if (x && y) {
      this.lastPos = [x, y];
    }
  }

  @action
  load() {
    this.isLoading = true;

    return new Promise((resolve) => {
      later(() => {
        this.isLoading = false;
        resolve();
      }, this.loadDelay);
    });
  }
}
