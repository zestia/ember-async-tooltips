import { uniqueId } from '@ember/helper';
import Tooltip from '#src/components/tooltip';

<template>
  <p>
    Tooltip position is automatically re-computed
  </p>

  {{#let (uniqueId) as |id|}}
    <div id={{id}} contenteditable>
      Type in here
    </div>
    <Tooltip @show={{true}} @element="#{{id}}" @position="bottom center">
      Tooltip
    </Tooltip>
  {{/let}}
</template>
