import Route from 'ember-route-template';
import Tooltip from '#src/components/tooltip';

export default Route(
  <template>
    <p>
      A tooltipper inside a tooltipper
    </p>

    <div class="parent">
      Parent

      <Tooltip>
        Parent tooltip
      </Tooltip>

      <div class="child">
        Child

        <Tooltip>
          Child tooltip
        </Tooltip>
      </div>
    </div>
  </template>
);
