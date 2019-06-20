# @zestia/ember-async-tooltips

<a href="https://badge.fury.io/js/%40zestia%2Fember-async-tooltips"><img src="https://badge.fury.io/js/%40zestia%2Fember-async-tooltips.svg" alt="npm version" height="18"></a> &nbsp; <a href="http://travis-ci.org/zestia/ember-async-tooltips"><img src="https://travis-ci.org/zestia/ember-async-tooltips.svg?branch=master"></a> &nbsp; <a href="https://david-dm.org/zestia/ember-async-tooltips#badge-embed"><img src="https://david-dm.org/zestia/ember-async-tooltips.svg"></a> &nbsp; <a href="https://david-dm.org/zestia/ember-async-tooltips#dev-badge-embed"><img src="https://david-dm.org/zestia/ember-async-tooltips/dev-status.svg"></a> &nbsp; <a href="https://emberobserver.com/addons/@zestia/ember-async-tooltips"><img src="https://emberobserver.com/badges/-zestia-ember-async-tooltips.svg"></a>

### Installation

```
ember install @zestia/ember-async-tooltips
```

### Demo

https://zestia.github.io/ember-async-tooltips

### Features

- [Manual positioning](#manual-positioning) ✔︎
- [Automatic positioning](#automatic-positioning) ✔︎
- [Customisable show/hide delays](#showinghiding) ✔︎
- [Customisable reference element](#custom-reference-element) ✔︎
- [Pre-loads any required data]() ✔︎
- Does not use jQuery ✔︎

### Example

When the tooltipper is hovered over, and any loading that needs to take place has finished, then the tooltip will be rendered in a place of your chosing in the DOM.

```handlebars
<ToolTipper @tooltip={{component "tooltip"}}>
  Hover over me
</ToolTipper>

{{! Tooltips will be rendered here: }}

<RenderTooltips />
```

### Positioning

Please see the [positioning library](https://github.com/zestia/position-utils#zestiaposition-utils) for more information on the possible positions.

#### Manual positioning

Setting the `@position` argument will compute `top` and `left` CSS properties to position the tooltip around the outside edge of the tooltipper that caused it to display.

```handlebars
<ToolTipper @tooltip={{component "tooltip" position="bottom left"}} />
```

#### Automatic positioning

By omitting the `@position` argument, the tooltip will be positioned automatically around the outside edge of the tooltipper. For example: If the tooltipper is at the very bottom of the viewport, then the tooltip will be displayed _above_ it - so as to remain visible.

```handlebars
<ToolTipper @tooltip={{component "tooltip"}} />
```

You can control this behaviour to some degree by changing how the viewport is split into sections.

<details>
  <summary>View code</summary>

#### Example 1

```javascript
// my-tooltip.js
import ToolTipComponent from '@zestia/ember-async-tooltips/components/tool-tip';

export default ToolTipComponent.extend({
  classNames: ['my-tooltip'],
  columns: 3,
  rows: 2
});
```

#### Example 2

```handlebars
<ToolTipper @tooltip={{component "tooltip" rows=5 columns=5}} />
```

</details>

### Showing/hiding

By default, tooltips will display when hovering over a tooltipper. But tooltippers also yield the ability to show or hide its tooltip manually.

<details>
  <summary>View code</summary>

```handlebars
<ToolTipper @tooltip={{component "tooltip"}} @mouseEvents={{false}} as |tooltipper|>
  <button onclick={{action tooltipper.hideTooltip}}>Hide</button>
  <button onclick={{action tooltipper.showTooltip}}>Show</button>
  <button onclick={{action tooltipper.toggleTooltip}}>Toggle</button>
</ToolTipper>
```

</details>

### Custom reference element

By default the tooltipper is the reference element that the causes the tooltip to show or hide, and is also the element that the tooltip will be positioned next to. But, you can specify any element to be the reference element.

<details>
  <summary>View code</summary>

#### Example 1

```javascript
// custom-tooltipper.js
import ToolTipperComponent from '@zestia/ember-async-tooltips/components/tool-tipper';
import computed from '@ember/computed';

export default ToolTipperComponent.extend({
  classNames: ['custom-tooltipper'],

  referenceElement: computed(function() {
    // Show the tooltip when hovering over the table row, rather than the tooltipper itself.
    return this.element.parentNode.parentNode;
  })
});
```

```handlebars
<table>
  <tr>
    <td>
      {{! The tooltip will display when hovering over the table row }}
      <CustomToolTipper @tooltip={{component "custom-tooltip"}} />
    </td>
  </tr>
</table>
```

#### Example 2

```handlebars
{{! parent-component/template.hbs }}
<ToolTipper
  @showDelay={{200}}
  @hideDelay={{200}}
  @referenceElement={{this.element}}
  @tooltip={{component "tooltip"}} />
```

</details>

### Preloading data

When a tooltipper is hovered over, `@onLoad` will be fired. You can respond to this action by returning a promise. The result of that promise will be available in the tooltip's template as `this.data`. This is a good way preload any data required for the tooltip to display.

The following example waits for 300ms before showing a tooltip, during this time it is loading some data. The show delay will _only be extended_ if the data wasn't retreived in time.

<details>
  <summary>View code</summary>

```javascript
// user-tooltipper.js
import ToolTipperComponent from '@zestia/ember-async-tooltips/components/tool-tipper';

export default ToolTipperComponent.extend({
  classNames: ['user-tooltipper'],
  showDelay: 300,
  hideDelay: 0
});
```

```handlebars
  {{! application.hbs }}
  <UserToolTipper @onLoad={{action "loadUser" "joe-bloggs"}} @tooltip={{component "user-tooltip"}}>
    Joe Bloggs
  </UserToolTipper>
```

```handlebars
  {{! user-tooltip.hbs }}
  Hello {{this.data.user.name}}
```

</details>

### Prerequisites

1\. It is assumed that all your tooltips will animate in and out. For this reason
you are _required_ to add the following styles.

<details>
  <summary>View code</summary>

```css
.your-tooltip.is-showing {
  animation: your-show-animation;
}

.your-tooltip.is-hiding {
  animation: your-hide-animation;
}
```

</details>

<br>

2\. In order to detect when a tooltip has animated out your application must be
informed of animation events. Add the following to `app/app.js`

<details>
  <summary>View code</summary>

```javascript
customEvents: {
  webkitAnimationEnd: 'animationEnd',
  msAnimationEnd: 'animationEnd',
  oAnimationEnd: 'animationEnd',
  animationend: 'animationEnd'
}
```

</details>
