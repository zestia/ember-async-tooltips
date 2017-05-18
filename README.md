# ember-async-tooltips

<a href="http://emberobserver.com/addons/ember-async-tooltips"><img src="http://emberobserver.com/badges/ember-async-tooltips.svg"></a> &nbsp; <a href="https://david-dm.org/amk221/ember-async-tooltips#badge-embed"><img src="https://david-dm.org/amk221/ember-async-tooltips.svg"></a> &nbsp; <a href="https://david-dm.org/amk221/ember-async-tooltips#dev-badge-embed"><img src="https://david-dm.org/amk221/ember-async-tooltips/dev-status.svg"></a> &nbsp; <a href="https://codeclimate.com/github/amk221/ember-async-tooltips"><img src="https://codeclimate.com/github/amk221/ember-async-tooltips/badges/gpa.svg" /></a> &nbsp; <a href="http://travis-ci.org/amk221/ember-async-tooltips"><img src="https://travis-ci.org/amk221/ember-async-tooltips.svg?branch=master"></a>

### Installation
```
ember install ember-async-tooltips
```

### Features
* Manual positioning either: N, NE, E, SE, S, SW, W, NW
* Automatic positioning. Viewport can be split into rows and columns which determine when a tooltip is positioned
* Will show after a specified hover delay
* Can wait for async data to be passed to them
* The hover delay is subtracted from the time it takes to load the async data

### Prerequisites

1. It is assumed that all your tooltips will animate in and out. For this reason
  you are required to add the following styles:

  ```css
  .tooltip.is-showing {
    animation: your-show-animation;
  }

  .tooltip.is-hiding {
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

### Manual positioning

Setting the `placement` attribute will add `left` and `right` CSS properties based upon the compass points that will positiong the `tool-tip` around the `tool-tipper` that caused it to display.

```handlebars
  {{tool-tipper tooltip=(component 'tool-tip' placement='NW')}}
```

### Automatic positioning

```handlebars
  {{tool-tipper tooltip=(component 'tool-tip')}}
```
