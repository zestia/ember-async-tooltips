import Route from 'ember-route-template';
import Component from '@glimmer/component';
import Tooltip from '@zestia/ember-async-tooltips/components/tooltip';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

class ManualPositionRoute extends Component {
  @tracked position = 'top left';

  setPosition = ({ target: { value } }) => {
    this.position = value;
  };

  <template>
    <p>
      Manual position
    </p>

    <select aria-label="Position" {{on "change" this.setPosition}}>
      <option>
        top left
      </option>
      <option>
        top center
      </option>
      <option>
        top right
      </option>
      <option>
        right top
      </option>
      <option>
        right middle
      </option>
      <option>
        right bottom
      </option>
      <option>
        bottom right
      </option>
      <option>
        bottom center
      </option>
      <option>
        bottom left
      </option>
      <option>
        left bottom
      </option>
      <option>
        left middle
      </option>
      <option>
        left top
      </option>
    </select>

    <br />

    <div class="manual-position-tooltipper">
      Tooltipper

      <Tooltip @position={{this.position}} @show={{true}}>
        Hello World
      </Tooltip>
    </div>
  </template>
}

export default Route(ManualPositionRoute);
