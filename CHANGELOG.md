# Changelog

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
