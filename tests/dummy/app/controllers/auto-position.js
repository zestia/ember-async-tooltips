import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class PositionController extends Controller {
  constructor() {
    super(...arguments);

    document.ondragover = (e) => e.preventDefault(); // Prevent ghost spring back
  }

  @action
  handleMouseDown(event) {
    this.startEvent = event;
  }

  @action
  handleDragStart(event) {
    event.dataTransfer.effectAllowed = 'move';
  }

  @action
  handleDragEnd(event) {
    const pos = event.target.getBoundingClientRect();
    const x = event.clientX - this.startEvent.clientX + pos.left;
    const y = event.clientY - this.startEvent.clientY + pos.top;

    event.target.style.top = `${y}px`;
    event.target.style.left = `${x}px`;
  }
}
