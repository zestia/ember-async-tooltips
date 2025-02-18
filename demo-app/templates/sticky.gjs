import Tooltip from '#src/components/tooltip';

const StickyTooltip = <template>
  <Tooltip
    @position="bottom center"
    @showDelay={{1200}}
    @stickyID="some-identifier"
  >
    {{yield}}
  </Tooltip>
</template>;

<template>
  <p>
    Subsequent tooltips show delays are ignored
  </p>

  <div>
    One
    <StickyTooltip>One</StickyTooltip>
  </div>

  <div>
    Two
    <StickyTooltip>Two</StickyTooltip>
  </div>

  <div>
    Three
    <StickyTooltip>Three</StickyTooltip>
  </div>

  <div>
    Four
    <StickyTooltip>Four</StickyTooltip>
  </div>

  <div>
    Five
    <StickyTooltip>Five</StickyTooltip>
  </div>
</template>
