/**
 * When a direct child (e.g. a button) is disabled, that element cannot receive
 * focus, so a tooltip on the child never shows. This wrapper becomes
 * the focusable "stand-in" when disabled: it gets a tabindex, role,
 * and aria attributes so the tooltip can be shown on the wrapper.
 *
 * When not disabled, the wrapper is a plain div with no extra attributes so
 * keyboard users tab directly to the real control.
 */

<template>
  <div
    tabindex={{if @disabled "0"}}
    role={{if @disabled @role}}
    aria-disabled={{if @disabled "true"}}
    ...attributes
  >
    {{yield}}
  </div>
</template>
