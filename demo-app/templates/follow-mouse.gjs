import Tooltip from '#src/components/tooltip';

<template>
  <p>
    Move the tooltip with the mouse, anchored to the axis matching the edge it
    is on
  </p>

  <div class="follow-mouse-container">
    <div class="follow-mouse-tooltipper">
      Top
      <Tooltip
        @usePopover={{true}}
        @followMouse={{true}}
        class="follow-mouse-tooltip follow-mouse-tooltip-top"
      >
        Hello World
      </Tooltip>
    </div>

    <div class="follow-mouse-tooltipper">
      Bottom
      <Tooltip
        @usePopover={{true}}
        @followMouse={{true}}
        class="follow-mouse-tooltip follow-mouse-tooltip-bottom"
      >
        Hello World
      </Tooltip>
    </div>

    <div class="follow-mouse-tooltipper">
      Left
      <Tooltip
        @usePopover={{true}}
        @followMouse={{true}}
        class="follow-mouse-tooltip follow-mouse-tooltip-left"
      >
        Hello World
      </Tooltip>
    </div>

    <div class="follow-mouse-tooltipper">
      Right
      <Tooltip
        @usePopover={{true}}
        @followMouse={{true}}
        class="follow-mouse-tooltip follow-mouse-tooltip-right"
      >
        Hello World
      </Tooltip>
    </div>
  </div>
</template>
