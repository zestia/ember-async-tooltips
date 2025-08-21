import Route from 'ember-route-template';
import Tooltip from '@zestia/ember-async-tooltips/components/tooltip';

export default Route(
  <template>
    <p>
      Use Focus (for keyboard support)
    </p>

    <br />

    <p>
      <button type="button">
        I should show when focused with a keyboard

        <Tooltip @useFocus={{true}}>
          Hello World
        </Tooltip>
      </button>
    </p>

    <br />

    <p>
      <span tabindex="0">
        Focus me (I have interactive children)
        <Tooltip @useFocus={{true}}>
          Hello
          <a href="#">World</a>
        </Tooltip>
      </span>
    </p>

    <br />

    <p>
      <button type="button">
        I should
        <em>not</em>
        show a tooltip when focused with a keyboard

        <Tooltip @useFocus={{false}}>
          Hello World
        </Tooltip>
      </button>
    </p>
  </template>
);
