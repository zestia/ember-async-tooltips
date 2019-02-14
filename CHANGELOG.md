# Changelog

6.0.1

* Add default rows and columns that result in the viewport being split up into 9 boxes, resulting in all possible positions.

6.0.0

* Change auto positioning algorithm so that: If a tooltipper is determined to be positioned in _just the west or east_ of the screen, then its tooltip will be placed in the opposite of that position.

5.2.4

* Add `tooltipper.toggleTooltip` action

5.2.3

* Upgrade ember-cli

5.2.2

* Add `@mouseEvents={{bool}}` ability to disable the usual behaviour of mousing over a tooltipper to get its tooltip to display. Useful if you want to manually show a tooltip on click for example.

5.2.1

* Introduce `tooltipService.hideActiveTooltips`. Useful if you want to manually force all tooltips to be hidden, perhaps on scroll for example

5.2.0

* Don't hide tooltip if moused out of tooltip, but still hovering over tooltipper

5.1.0

* Change `referenceElement` to be a property, rather than a function

5.0.2

* Introduce `referenceElement` to customise trigger element [more](https://github.com/zestia/ember-async-tooltips#custom-reference-element)

5.0.1

* Add noops

5.0.0

* Switched to camelcase args
* Split `hoverDelay` into `showDelay` and `hideDelay` for finer control

4.0.7

* Fix positioning of tooltips not working in Safari when the document has been scrolled.
* Fix demo app in Safari

4.0.6

* Adds an `is-loading` class to the tooltipper whilst it is loading the content required to display its tooltip

4.0.5

* Caches data when loading tooltip, so `on-load` will only fire once.
  * This caches the data on a per-tooltipper basis.
  * If you have multiple instances of the same tooltipper on a page, you will still have to have your own caching strategy for that.

4.0.4

* Expose `hide` action from tooltip

4.0.3

* Expose `hideTooltip` and `showTooltip` actions from tooltiper

4.0.2

* Upgrade position utils

4.0.1

* Upgrade position utils

4.0.0

* Moved position utils to a separate module
* Changed `placement` attribute to `position`

3.0.1

* Make on-load action more tollerant if not provided, or if it doesn't return a promise.

3.0.0

* Refactor to make sure correct element offsets are used
* Changes to arguments signatures in placement utils

2.0.0

* Remove Positionable Mixin
* Reduce reliance on jQuery

1.0.8

* Fix travis builds

1.0.7

* Upgrade dependencies

1.0.6

* Lint everything

1.0.4

* Upgrade devDependencies

1.0.3

* Upgrade devDependencies

1.0.2

* Upgrade devDependencies

1.0.1

* Skipped

1.0.0

* Update how custom placements are set

0.1.3

* Move ember-improved-cp to dependencies

0.1.2

* Add support for tabindex attribute to tooltipper component

0.1.1

* Fix east/west

0.1.0

* Initial release
