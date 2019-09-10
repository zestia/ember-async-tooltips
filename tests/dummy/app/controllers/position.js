import { Promise } from 'rsvp';
import Controller from '@ember/controller';
import { run, later } from '@ember/runloop';
import { equal } from '@ember/object/computed';

export default Controller.extend({
  window,

  init() {
    this._super(...arguments);
    this.set('showDelay', 500);
    this.set('hideDelay', 0);
    this.set('loadDelay', 500);
    this.set('position', 'auto');
    this.set('showTooltipper', true);
  },

  adjustDisabled: equal('position', 'auto'),

  actions: {
    unload() {
      run(() => this.set('showTooltipper', false));
      run(() => this.set('showTooltipper', true));
    },

    setPosition(position) {
      this.set('position', position);
    },

    setAdjust(bool) {
      this.set('adjust', bool);
    },

    setShowDelay(delay) {
      this.set('showDelay', delay);
    },

    setHideDelay(delay) {
      this.set('hideDelay', delay);
    },

    setLoadDelay(loadDelay) {
      this.set('loadDelay', loadDelay);
    },

    reposition(e) {
      const [x, y] = this.lastPos;
      const [t, l] = this.startPos;

      const element = e.target;
      const top = y - l;
      const left = x - t;

      element.style.top = `${top}px`;
      element.style.left = `${left}px`;
    },

    storeStartPos(e) {
      const pos = e.target.getBoundingClientRect();

      this.set('startPos', [e.clientX - pos.left, e.clientY - pos.top]);
    },

    storeLastPos(e) {
      const { clientX: x, clientY: y } = e;

      if (x && y) {
        this.set('lastPos', [x, y]);
      }
    },

    load() {
      this.set('isLoading', true);

      return new Promise(resolve => {
        later(() => {
          this.set('isLoading', false);
          resolve();
        }, this.loadDelay);
      });
    }
  }
});
