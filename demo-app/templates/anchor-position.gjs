import Tooltip from '#src/components/tooltip';

<template>
  <p>
    Opt into CSS Anchor positioning on a per tooltip basis or across all
    tooltips.
  </p>

  <div>
    Hover over me

    <Tooltip class="anchor-position-tooltip" @useCSSAnchorPositioning={{true}}>
      Hello World
    </Tooltip>
  </div>
</template>
