import Route from 'ember-route-template';
import Tooltip from '@zestia/ember-async-tooltips/components/tooltip';

export default Route(
  <template>
    <p>
      Use Click (instead of mouse enter/leave events)
    </p>

    <div>
      Click me 1

      <Tooltip @useClick={{true}}>
        Hello World
      </Tooltip>
    </div>

    <br /><br /><br /><br />

    <div>
      Click me 2

      <Tooltip @useClick={{true}}>
        Hello World
      </Tooltip>
    </div>
  </template>
);
