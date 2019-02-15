# @zestia/ember-async-tooltips

<a href="http://emberobserver.com/addons/ember-async-tooltips"><img src="http://emberobserver.com/badges/ember-async-tooltips.svg"></a> &nbsp; <a href="https://david-dm.org/zestia/ember-async-tooltips#badge-embed"><img src="https://david-dm.org/zestia/ember-async-tooltips.svg"></a> &nbsp; <a href="https://david-dm.org/zestia/ember-async-tooltips#dev-badge-embed"><img src="https://david-dm.org/zestia/ember-async-tooltips/dev-status.svg"></a> &nbsp; <a href="http://travis-ci.org/zestia/ember-async-tooltips"><img src="https://travis-ci.org/zestia/ember-async-tooltips.svg?branch=master"></a>

### Installation
```
ember install @zestia/ember-async-tooltips
```

### Demo

https://zestia.github.io/ember-async-tooltips

<a href="https://zestia.github.io/ember-async-tooltips">
  <img src="docs/screenshot.png" width="512" height="319">
</a>

### Notes

* Does not use jQuery

### Example

When the `tool-tipper` component is hovered over, the `my-tooltip` component will be rendered in a place of your chosing in the DOM.

```handlebars
<ToolTipper @tooltip={{component "my-tooltip"}}>
  Hover over me
</ToolTipper>
```

Tooltips will be rendered here:

```handlebars
<RenderActiveTooltips />
```

### Features

* [Manual positioning](#manual-positioning)
* [Automatic positioning](#automatic-positioning): Viewport is split into rows and columns which help determine where a tooltip should be optimally positioned (see the [demo](https://zestia.github.io/ember-async-tooltips/#/position))
* Can specify delay before the tooltip will show/hide on a per-tooltip or per-class basis
* Can optionally wait for async data to be loaded and passed to the tooltips without negatively affecting the hover delay.

### Prerequisites

1. It is assumed that all your tooltips will animate in and out. For this reason
  you are required to add the following styles:

  ```css
  .your-tooltip.is-showing {
    animation: your-show-animation;
  }

  .your-tooltip.is-hiding {
    animation: your-hide-animation;
  }
  ```

2. In order to detect when a tooltip has animated out your application must be
   informed of animation events. Add the following to `app/app.js`

  ```javascript
  customEvents: {
    webkitAnimationEnd: 'animationEnd',
    msAnimationEnd: 'animationEnd',
    oAnimationEnd: 'animationEnd',
    animationend: 'animationEnd'
  }
  ```

### Recommended usage

The following configuration creates a new tooltip that:
* Has custom automatic positioning.
  Excludes left and right - useful if you don't want to add CSS for these positions.
* Has a custom hover delay (won't display the user tooltip until after 300ms has passed)
* Loads the user _during_ the alotted hover delay time period, or extending the delay if it wasn't retreived in time


```javascript
// user-tooltipper.js
import ToolTipperComponent from '@zestia/ember-async-tooltips/components/tool-tipper';

export default ToolTipperComponent.extend({
  classNames: ['user-tooltipper'],
  showDelay: 300,
  hideDelay: 0
});
```

```javascript
// user-tooltip.js
import ToolTipComponent from '@zestia/ember-async-tooltips/components/tool-tip';

export default ToolTipComponent.extend({
  classNames: ['user-tooltip'],
  columns: 3,
  rows: 2
});
```

```handlebars
  {{! application.hbs }}
  <UserToolTipper @onLoad={{action "loadUser" this.user.id}} @tooltip={{component "user-tooltip"}}>
    {{this.user.name}}
  </UserToolTipper>
```

```handlebars
  {{! user-tooltip.hbs }}
  Hello {{this.data.user.name}}
```

### Manual positioning

Setting the `position` argument will add `left` and `right` CSS properties based upon the position. This will position the `tool-tip` around the outside edge of the `tool-tipper` component that caused it to display.

```handlebars
  <ToolTipper @tooltip={{component "my-tooltip" position="NW"}} />
```

### Automatic positioning

The tooltip will be positioned around the outside edge of the `tool-tipper` component that caused it display by chosing the most appropriate position. For example: If the `tool-tipper` component is at the very bottom of the viewport, then the `tool-tip` component will be displayed _above_ the `tool-tipper` - so as to remain visible.

```handlebars
  <ToolTipper @tooltip={{component "my-tooltip"}} />
```

### Manual showing/hiding

The tooltipper yields the ability to show or hide its tooltip.

```handlebars
  <ToolTipper @tooltip={{component "my-tooltip"}} @mouseEvents={{false}} as |tooltipper|>
    <button onclick={{action tooltipper.hideTooltip}}>Hide</button>
    <button onclick={{action tooltipper.showTooltip}}>Show</button>
    <button onclick={{action tooltipper.toggleTooltip}}>Toggle</button>
  </ToolTipper>
```


### Custom reference element

By extending a tooltipper, you can specify any element to be the reference element for the tooltip
to attach to. For example:

```javascript
// custom-tooltipper.js
import ToolTipperComponent from '@zestia/ember-async-tooltips/components/tool-tipper';
import computed from '@ember/computed';

export default ToolTipperComponent.extend({
  classNames: ['custom-tooltipper'],

  referenceElement: computed(function() {
    // Show tool tip on hovering over the table row, rather than the tooltipper itself.
    return this.element.parentNode.parentNode;;
  })
});
```

```handlebars
<table>
  <tr>
    <td>
      {{! This tooltip will display when hovering over the table row }}
      <CustomToolTipper @tooltip={{component "my-tooltip"}} />
    </td>
  </tr>
</table>
```

An alternative example is use in a child component...

```handlebars
{{! parent-component/template.hbs }}
<ToolTipper
  @showDelay={{200}}
  @hideDelay={{200}}
  @referenceElement={{this.element}}
  @tooltip={{component "my-tooltip"}} />
```
