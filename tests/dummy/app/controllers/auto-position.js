import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class PositionController extends Controller {
  @inject('tooltip') tooltipService;

  constructor() {
    super(...arguments);

    document.ondragover = (e) => e.preventDefault(); // Prevent ghost spring back
  }

  @action
  handleDragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
  }

  @action
  handleDragEnd(e) {
    const x = e.clientX - e.target.clientWidth / 2;
    const y = e.clientY - e.target.clientHeight / 2;

    e.target.style.top = `${y}px`;
    e.target.style.left = `${x}px`;
  }
}
