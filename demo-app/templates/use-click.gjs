import Tooltip from '#src/components/tooltip';

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
