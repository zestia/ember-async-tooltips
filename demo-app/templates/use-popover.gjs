import Tooltip from '#src/components/tooltip';

<template>
  <p>
    Opt in to native popover, and opt out of the JS positioning, allowing you to
    use CSS anchor positioning instead.
  </p>

  <div>
    Hover over me

    <Tooltip class="use-popover-tooltip" @usePopover={{true}}>
      Hello World
    </Tooltip>
  </div>
</template>
