import Route from 'ember-route-template';
import Tooltip from '@zestia/ember-async-tooltips/components/tooltip';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { on } from '@ember/modifier';

class ManualRoute extends Component {
  @tracked shouldShowTooltip;

  toggleTooltip = () => (this.shouldShowTooltip = !this.shouldShowTooltip);

  <template>
    <p>
      Showing and hiding a tooltipper without mouse enter/leave events
    </p>

    <div>
      <button type="button" {{on "click" this.toggleTooltip}}>Toggle Tooltip</button>

      {{#if this.shouldShowTooltip}}
        <Tooltip @show={{true}}>
          Hello World
        </Tooltip>
      {{/if}}
    </div>
  </template>
}

export default Route(ManualRoute);
