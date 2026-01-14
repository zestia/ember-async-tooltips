import Route from 'ember-route-template';
import Component from '@glimmer/component';
import Tooltip from '@zestia/ember-async-tooltips/components/tooltip';
import { on } from '@ember/modifier';

class AutoPositionRoute extends Component {
  constructor() {
    super(...arguments);
    document.ondragover = (e) => e.preventDefault(); // Prevent ghost spring back
  }

  handleMouseDown = (event) => {
    this.startEvent = event;
  };

  handleDragStart = (event) => {
    event.dataTransfer.effectAllowed = 'move';
  };

  handleDragEnd = (event) => {
    const pos = event.target.getBoundingClientRect();
    const x = event.clientX - this.startEvent.clientX + pos.left;
    const y = event.clientY - this.startEvent.clientY + pos.top;

    event.target.style.top = `${y}px`;
    event.target.style.left = `${x}px`;
  };

  <template>
    {{! template-lint-disable no-invalid-interactive no-pointer-down-event-binding  }}

    <div class="auto-position-page">
      <div
        draggable="true"
        {{on "mousedown" this.handleMouseDown}}
        {{on "dragstart" this.handleDragStart}}
        {{on "dragend" this.handleDragEnd}}
      >
        Hover over me

        <Tooltip>
          Hello World
        </Tooltip>
      </div>
    </div>

    <table class="auto-position-table">
      <tbody>
        <tr>
          <td>
            top left
          </td>
          <td>
            top center
          </td>
          <td>
            top right
          </td>
        </tr>
        <tr>
          <td>
            middle left
          </td>
          <td>
            middle center
          </td>
          <td>
            middle right
          </td>
        </tr>
        <tr>
          <td>
            bottom left
          </td>
          <td>
            bottom center
          </td>
          <td>
            bottom right
          </td>
        </tr>
      </tbody>
    </table>
  </template>
}

export default Route(AutoPositionRoute);
