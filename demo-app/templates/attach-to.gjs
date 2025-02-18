import Tooltip from '#src/components/tooltip';
import { uniqueId } from '@ember/helper';

<template>
  <p>
    Trigger the tooltip on mouse over of an element, but position the tooltip to
    a child element
  </p>

  <div>
    Hover over me

    {{#let (uniqueId) as |id|}}
      <small id={{id}}>ⓘ</small>

      <Tooltip @attachTo="#{{id}}" @position="bottom center">
        Hello World
      </Tooltip>
    {{/let}}
  </div>
</template>
