import Route from 'ember-route-template';
import Tooltip from '@zestia/ember-async-tooltips/components/tooltip';
import DisabledWrapper from '@zestia/ember-async-tooltips/components/disabled-wrapper';

export default Route(
  <template>
    <p>
      Disabled buttons cannot receive focus (or mouseenter if in a test suite),
      so a tooltip on the button itself never shows unless you use a wrapper
      element.
    </p>

    <h2>
      Tooltip on a disabled button without a wrapper
    </h2>

    <p>
      This disabled button has the tooltip on itself. You cannot focus a
      disabled button, so the tooltip never appears.
    </p>

    <button type="button" disabled>
      I am disabled

      <Tooltip @useFocus={{true}}>
        You will never see this — disabled elements can't receive focus
      </Tooltip>
    </button>

    <br /><br />

    <h2>
      Tooltip on a disabled button wrapped with the
      <code>&lt;DisabledWrapper&gt;</code>
      component
    </h2>

    <p>
      Put the tooltip on a wrapper element that is focusable when the button
      inside is disabled. When the button is disabled, the wrapper will receive
      focus and the tooltip will be shown.
    </p>

    <DisabledWrapper @disabled={{true}} @role="button">
      <button type="button" disabled>
        I am disabled
      </button>

      <Tooltip @useFocus={{true}}>
        Button is disabled. This tooltip is on the wrapper.
      </Tooltip>
    </DisabledWrapper>

    <br /><br />

    <h2>
      Tooltip on an enabled button wrapped with the
      <code>&lt;DisabledWrapper&gt;</code>
      component
    </h2>

    <p>
      The tooltip shows when the button is focused, despite the wrapper being
      the tooltipper.
    </p>

    <DisabledWrapper @disabled={{false}} @role="button">
      <button type="button">
        I am not disabled
      </button>

      <Tooltip @useFocus={{true}}>
        This tooltip should show when the button is focused
      </Tooltip>
    </DisabledWrapper>
  </template>
);
