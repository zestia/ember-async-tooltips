# @zestia/ember-async-tooltips

[![Latest npm release][npm-badge]][npm-badge-url]
[![Ember Observer][ember-observer-badge]][ember-observer-url]

<!-- [![GitHub Actions][github-actions-badge]][github-actions-url] -->

[npm-badge]: https://img.shields.io/npm/v/@zestia/ember-async-tooltips.svg
[npm-badge-url]: https://www.npmjs.com/package/@zestia/ember-async-tooltips
[github-actions-badge]: https://github.com/zestia/ember-async-tooltips/workflows/CI/badge.svg
[github-actions-url]: https://github.com/zestia/ember-async-tooltips/actions
[ember-observer-badge]: https://emberobserver.com/badges/-zestia-ember-async-tooltips.svg
[ember-observer-url]: https://emberobserver.com/addons/@zestia/ember-async-tooltips

## Installation

```
ember install @zestia/ember-async-tooltips
```

## Demo

https://zestia.github.io/ember-async-tooltips/

## Features

- Manual positioning ✔︎
- Automatic positioning ✔︎
- Customisable show/hide delays ✔︎
- Customisable reference element ✔︎
- Customisable destination element ✔︎
- Pre-loads any required data ✔︎
- Tethers to element ✔︎

## Notes

- This addon intentionally does not come with any styles.

## Example

```handlebars
<div>
  Hover over me

  <Tooltip>
    Hello World
  </Tooltip>
</div>
```

## Arguments

### `@element`

By default the parent of the tooltip element is what causes the tooltip to show or hide, and is also the element that the tooltip will be positioned next to. But, you can specify any element to be the reference element.

### `@destination`

Tooltips are rendered in-place, unless a destination element is specified, in which case they will be rendered inside that element instead.

### `@show`

By default, tooltips will display when hovering over the reference element. But you can also show or hide a tooltip manually using the `@show` argument.

### `@showDelay`

The show delay will prevent the tooltip from being shown until the specified milliseconds have passed.

### `@hideDelay`

This hide delay will prevent the tooltip from being hidden until the specified milliseconds have passed.

### `@stickyID`

You can group tooltips together with a sticky identifier. When a tooltip from a group is showing, then other tooltips in that group (with the same identifier) will show instantly - ignoring their show delay. The term sticky is used because it feels as if the tooltips are stuck open.

### `@stickyTimeout`

When a group of tooltips is in sticky mode (and so they have no show delays), after a period of time they will revert back to their normal delays. Use this argument to tweak that behaviour.

### `@onLoad`

When a reference element is hovered over, `@onLoad` will be fired. You can respond to this action by returning a promise. The result of that promise will be available in the tooltip's template as `@tooltip.data`. This is a good way preload any data required for the tooltip to display.

In the following example, there is a show delay of 300ms before a tooltip will appear. During that time it is loading some data. If the load delay exceeds the show delay, the difference will be subtracted from the show delay.

```handlebars
{{! application.hbs }}
<LinkTo @route='user' @model={{123}}>
  Preview user

  <UserTooltip @id={{123}} />
</LinkTo>
```

```handlebars
{{! user-tooltip.hbs }}
<Tooltip @showDelay={{300}} @onLoad={{fn this.loadUser @id}} as |tooltip|>
  {{tooltip.data.user.name}}
</Tooltip>
```

### `@position`

Tooltips will be automatically positioned around the outside edge of the reference element if no `@position` is specified.

You can use the arguments `@rows` and `@columns` to tweak how the viewport is split into a grid, thereby altering the positioning algorithm.

Please see the [positioning library](https://github.com/zestia/position-utils#zestiaposition-utils) for more information on the possible positions.

#### Custom positioning

You can set `@position` to be a function. Your function will receive the reference element's position in the viewport. You are then free to return an appropriate counter position for your tooltip. e.g:

```javascript
position() {
  switch(referencePosition) {
    case 'top right':
      return 'left top';
    // ...
  }
}
```

# API

The tooltip receives an API as an argument, yielding:

- The ability to manually hide it
- Any data that was loaded
- Any error if the data was not loaded

```handlebars
<Tooltip as |tooltip|>
  {{!tooltip.hide}}
  {{!tooltip.data}}
  {{!tooltip.error}}
</Tooltip>
```

# Animating

If your tooltips need to animate in and out, you can utilise these attributes:

```css
[data-tooltip-showing='true'] {
  animation: your-show-animation;
}

[data-tooltip-showing='false'] {
  animation: your-hide-animation;
}
```

You may want to alter animations for sticky tooltips:

```css
[data-tooltip-sticky='true'] {
  animation-name: none;
}
```
