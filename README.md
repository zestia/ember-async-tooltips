# @zestia/ember-async-tooltips

<p>
  <a href="http://travis-ci.org/zestia/ember-async-tooltips">
    <img src="https://travis-ci.org/zestia/ember-async-tooltips.svg?branch=master">
  </a>

  <a href="https://david-dm.org/zestia/ember-async-tooltips#badge-embed">
    <img src="https://david-dm.org/zestia/ember-async-tooltips.svg">
  </a>

  <a href="https://david-dm.org/zestia/ember-async-tooltips#dev-badge-embed">
    <img src="https://david-dm.org/zestia/ember-async-tooltips/dev-status.svg">
  </a>

  <a href="https://emberobserver.com/addons/@zestia/ember-async-tooltips">
    <img src="https://emberobserver.com/badges/-zestia-ember-async-tooltips.svg">
  </a>

  <img src="https://img.shields.io/badge/Ember-%3E%3D%203.16-brightgreen">
</p>

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

## Example

When the tooltipper is hovered over, and any loading that needs to take place has finished, then the tooltip will be rendered inside it.

```handlebars
<Tooltipper @tooltip={{component "tooltip" @text="Hello World"}}>
  Hover over me
</Tooltipper>
```

You can replace the `@tooltip` argument with any custom component of your choosing.

(_Tip_: You can use [ember-in-element-polyfill](https://github.com/kaliber5/ember-in-element-polyfill) to render the tooltip elsewhere in your application)

## Positioning

Please see the [positioning library](https://github.com/zestia/position-utils#zestiaposition-utils) for more information on the possible positions.

### Manual positioning

Setting the `@position` argument will compute `top` and `left` CSS properties to position the tooltip around the outside edge of the tooltipper that caused it to display.
By default, if the tooltip won't fit into the viewport, its position will be adjusted in an attempt to keep it visible. You can disable this behaviour by setting `@adjust` to false.

```handlebars
<Tooltipper
  @position="bottom left"
  @tooltip={{component "my-tooltip"}}
/>
```

### Automatic positioning

By omitting the `@position` argument, the tooltip will be positioned automatically around the outside edge of the tooltipper. For example: If the tooltipper is at the very bottom of the viewport, then the tooltip will be displayed _above_ it - so as to remain visible.

```handlebars
<Tooltipper @tooltip={{component "my-tooltip"}} />
```

You can control this behaviour to some degree by changing how the viewport is [split into sections](https://github.com/zestia/position-utils#zestiaposition-utils).

```handlebars
<Tooltipper
  @tooltip={{component "my-tooltip"}}
  @rows={{2}}
  @columns={{3}}
/>
```

## Showing/hiding

By default, tooltips will display when hovering over a tooltipper. But tooltippers also yield the ability to show or hide its tooltip manually.
Additionally, you can customise the show/hide delays.

```handlebars
<Tooltipper
  @tooltip={{component "my-tooltip"}}
  @showDelay={{500}}
  @hideDelay={{0}}
/>
```

## API

The tooltipper yields an API to control the tooltip.

```handlebars
<Tooltipper
  @tooltip={{component "my-tooltip"}}
  @mouseEvents={{false}} as |tooltipper|
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
  @tooltip={{component "my-tooltip"}}
  @referenceElement={{this.element.parentNode}}
/>
```

## Preloading data

When a tooltipper is hovered over, `@onLoad` will be fired. You can respond to this action by returning a promise. The result of that promise will be available in the tooltip's template as `@data`. This is a good way preload any data required for the tooltip to display.

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
  @showDelay={{300}}
  @onLoad={{fn this.loadUser @id}}
  @tooltip={{component "user-tooltip"}}
/>
```

```handlebars
{{! user-tooltip.hbs }}
Hello {{@tooltip.data.user.name}}
```

## Prerequisites

1\. It is assumed that all your tooltips will animate in and out. For this reason you are _required_ to add the following styles as a minimum.

```css
.tooltip--showing {
  animation: your-show-animation;
}

.tooltip--hiding {
  animation: your-hide-animation;
}
```
