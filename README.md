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

https://zestia.github.io/ember-async-tooltips

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
- It is configured with [ember-test-waiters](https://github.com/emberjs/ember-test-waiters) so `await`ing in your test suite will just work.

## Example

```handlebars
<div>
  Hover over me

  <Tooltip>
    Hello World
  </Tooltip>
</div>
```

## `Tooltip`

### Arguments

#### `@element`

Optional. By default, the parent of the tooltip element is what causes the tooltip to show & hide, and is _also_ the element it will be positioned next to.

#### `@destination`

Optional. By default, tooltips are rendered in-place. Specify a destination if you want to render them in that element instead.

#### `@attachTo`

Optional. By default, tooltips will be positioned next to the element that caused them to display. Unless this argument is specified, in which case the tooltip will show when mousing over the element, but will then be positioned next to a _different_ element.

#### `@show`

Optional. By default, tooltips will display when hovering over the reference element. But you can use this argument to force a tooltip to display.

#### `@showDelay`

Optional. The show delay will prevent the tooltip from being shown until the specified milliseconds have passed after entering the reference element.

#### `@hideDelay`

Optional. The hide delay will prevent the tooltip from being hidden until the specified milliseconds have passed after leaving the reference element.

#### `@stickyID`

Optional. You can group tooltips together with a sticky identifier. When a tooltip from a group of tooltips all with the same identifier is shown, then other tooltips in that group will show instantly - ignoring their show delay. The term sticky is used because it feels as if the tooltips are stuck open.

#### `@stickyTimeout`

Optional. When a group of tooltips is in sticky mode (and so they have no show delays), after a period of time they will revert back to their normal delays. Use this argument to tweak that behaviour.

#### `@onLoad`

Optional. When an element is hovered over, `@onLoad` will be fired. You can respond to this action by returning a promise. The result of that promise will be available in the tooltip's template as `@tooltip.data`. This is a good way preload any data required for the tooltip to display.

In the following example, there is a show delay of 300ms before a tooltip will appear. But, _during that time_ it is loading some data. If the load delay exceeds the show delay, the difference will be subtracted from the show delay.

<details>
  <summary>Example</summary>
  
```handlebars
{{! application.hbs }}
<LinkTo @route='user' @model={{123}}>
  Preview user

<UserTooltip @id={{123}} />
</LinkTo>

````

```handlebars
{{! user-tooltip.hbs }}
<Tooltip @showDelay={{300}} @onLoad={{fn this.loadUser @id}} as |tooltip|>
  {{tooltip.data.user.name}}
</Tooltip>
````

</details>

#### `@position`

Optional. Tooltips will be automatically positioned around the outside edge of the element if no `@position` is specified.

For example: If the element is positioned in the 'bottom left' of the viewport, then the tooltip will be displayed _above_, so as to remain visible.

You can use the arguments `@rows` and `@columns` to tweak how the positioning algorithm decides what 'bottom left' means. See the [positioning library](https://github.com/zestia/position-utils#zestiaposition-utils) for more information.

You can also set `@position` to be a function. It will receive the element's position in the viewport. You are then free to return an appropriate counter position for your tooltip. e.g:

<details>
  <summary>Example</summary>

```javascript
position() {
  switch(referencePosition) {
    case 'top right':
      return 'left top';
    // ...
  }
}
```

</details>

### API

#### `hide`

Hides the tooltip (waiting for any animations), then un-renders it.

#### `data`

Any data that was loaded via `@onLoad`

#### `error`

Any error if the data was `@onLoad` failed

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
