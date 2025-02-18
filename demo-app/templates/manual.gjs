import Tooltip from '#src/components/tooltip';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { on } from '@ember/modifier';

export default class extends Component {
  @tracked shouldShowTooltip;

  toggleTooltip = () => (this.shouldShowTooltip = !this.shouldShowTooltip);

  <template>
    <p>
      Showing and hiding a tooltipper without mouse enter/leave events
    </p>

    <div>
      <input
        type="text"
        {{on "focus" this.toggleTooltip}}
        {{on "blur" this.toggleTooltip}}
        placeholder="Focus me"
        aria-label="Example input with a tooltip"
      />

      {{#if this.shouldShowTooltip}}
        <Tooltip @show={{true}}>
          Hello World
        </Tooltip>
      {{/if}}
    </div>
  </template>
}
