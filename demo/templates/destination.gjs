import Route from 'ember-route-template';
import Tooltip from '@zestia/ember-async-tooltips/components/tooltip';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';

class DestinationRoute extends Component {
  @tracked elsewhere;

  registerElsewhere = modifier((element) => (this.elsewhere = element));

  <template>
    <p>
      The tooltip is output to a specific element in the DOM (view source).
    </p>

    <div>
      Hover over me

      <Tooltip @destination={{this.elsewhere}}>
        Hello World
      </Tooltip>
    </div>

    <div id="elsewhere" {{this.registerElsewhere}}>
      {{! tooltip rendered here }}
    </div>
  </template>
}

export default Route(DestinationRoute);
