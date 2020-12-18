import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { next } from '@ember/runloop';

export default class PositionController extends Controller {
  constructor() {
    super(...arguments);

    document.ondragover = (e) => e.preventDefault(); // Prevent ghost spring back
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
}
