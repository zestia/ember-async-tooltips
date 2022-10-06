# @zestia/ember-async-tooltips

[![Latest npm release][npm-badge]][npm-badge-url]
[![GitHub Actions][github-actions-badge]][github-actions-url]
[![Ember Observer][ember-observer-badge]][ember-observer-url]

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

- [Manual positioning](#manual-positioning) ✔︎
- [Automatic positioning](#automatic-positioning) ✔︎
- [Customisable show/hide delays](#showinghiding) ✔︎
- [Customisable reference element](#custom-reference-element) ✔︎
- [Pre-loads any required data](#preloading-data) ✔︎

## Notes

- This addon intentionally does not come with any styles.

## Example

When the tooltipper is hovered over, and any loading that needs to take place has finished, then the tooltip will be rendered inside. (Or, you can use the `{{in-element}}` helper to render the tooltip elsewhere).

```handlebars
<Tooltipper @Tooltip={{component "tooltip" text="Hello World"}}>
  Hover over me
</Tooltipper>
```

You can replace the `@Tooltip` argument with any custom component of your choosing.

## Positioning

Please see the [positioning library](https://github.com/zestia/position-utils#zestiaposition-utils) for more information on the possible positions.

### Manual positioning

Setting the `@position` argument will compute `top` and `left` CSS properties to position the tooltip around the outside edge of the tooltipper that caused it to display.

```handlebars
<Tooltipper
  @Tooltip={{component "my-tooltip"}}
  @position="bottom left"
/>
```

### Automatic positioning

By omitting the `@position` argument, the tooltip will be positioned automatically around the outside edge of the tooltipper. For example: If the tooltipper is at the very bottom of the viewport, then the tooltip will be displayed _above_ it - so as to remain visible.

```handlebars
<Tooltipper @Tooltip={{component "my-tooltip"}} />
```

You can control what position the reference element is considered to be in by changing how the viewport is [split into a grid](https://github.com/zestia/position-utils#zestiaposition-utils).

```handlebars
<Tooltipper
  @Tooltip={{component "my-tooltip"}}
  @rows={{2}}
  @columns={{3}}
/>
```

### Custom positioning

You can set `@position` to be a function. Your function will receive the reference element's position in the viewport. You are then free to return an appropriate counter-position for your tooltip. e.g:

```javascript
position() {
  switch(referencePosition) {
    case 'top right':
      return 'left top';
    // ...
  }
}
```

## Showing/hiding

By default, tooltips will display when hovering over a tooltipper. But tooltippers also yield the ability to show or hide its tooltip manually, on focusin for example. Additionally, you can customise the show/hide delays.

```handlebars
<Tooltipper
  @Tooltip={{component "my-tooltip"}}
  @showDelay={{500}}
  @hideDelay={{0}}
/>
```

You can also use the actions `@onShowTooltip` and `@onHideTooltip`. These hooks include load time, render time, and animation time.


## Sticky tooltips

You can group tooltips together, so that once one from a group is showing, then others in that group will show instantly - ignoring their show delay.

```handlebars
<Tooltipper
  @Tooltip={{component "my-tooltip"}}
  @showDelay={{1000}}
  @stickyID="some-group"
/>
```

The normal showing/hiding behaviour will resume after a period of time. This can be optionally be customised with `@stickyTimeout`.

## API

The tooltipper yields an API to control the tooltip.

```handlebars
<Tooltipper
  @Tooltip={{component "my-tooltip"}}
  @mouseEvents={{false}}
  as |tooltipper|
>
  {{!tooltipper.isLoading}}
  {{!tooltipper.hideTooltip}}
  {{!tooltipper.showTooltip}}
  {{!tooltipper.toggleTooltip}}
  {{!tooltipper.repositionTooltip}}
</Tooltipper>
```

Similarly, the tooltip receives an API as an argument:

```handlebars
<div class="my-tooltip">
  {{!@tooltip.hide}}
  {{!@tooltip.reposition}}
  {{!@tooltip.data}}
  {{!@tooltip.error}}
</div>
```

## Custom reference element

By default the tooltipper _is_ the reference element that the causes the tooltip to show or hide, and is also the element that the tooltip will be positioned next to. But, you can specify any element to be the reference element.

```handlebars
<Tooltipper
  @Tooltip={{component "my-tooltip"}}
  @referenceElement={{this.element.parentNode}}
/>
```

## Preloading data

When a tooltipper is hovered over, `@onLoad` will be fired. You can respond to this action by returning a promise. The result of that promise will be available in the tooltip's template as `@tooltip.data`. This is a good way preload any data required for the tooltip to display.

The following example waits for 300ms before showing a tooltip, during this time it is loading some data. The show delay will _only be extended_ if the data wasn't retreived in time.

```handlebars
{{! application.hbs }}
<UserTooltipper @id={{123}}>
  Joe Bloggs
</UserTooltipper>
```

```handlebars
{{! user-tooltipper.hbs }}
<Tooltipper
  @Tooltip={{component "user-tooltip"}}
  @showDelay={{300}}
  @onLoad={{fn this.loadUser @id}}
/>
```

```handlebars
{{! user-tooltip.hbs }}
Hello {{@tooltip.data.user.name}}
```

## Animating

If your tooltips need to animate in and out, you can utilise these attributes:

```css
.tooltip[data-showing='true'] {
  animation: your-show-animation;
}

.tooltip[data-showing='false'] {
  animation: your-hide-animation;
}
```

You may want to alter animations for sticky tooltips:

```css
.tooltip[data-sticky='true'] {
  animation-name: none
}
