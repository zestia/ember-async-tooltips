import Route from 'ember-route-template';
import Tooltip from '#src/components/tooltip';

export default Route(
  <template>
    <p>
      Basic usage
    </p>

    <div>
      Hover over me

      <Tooltip>
        Hello World
      </Tooltip>
    </div>
  </template>
);
