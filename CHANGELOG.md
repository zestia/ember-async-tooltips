# Changelog

## 13.3.1

- Upgrade dependencies

## 13.3.0

- Allow custom 'auto' positioning
  (The `@position` argument now takes a function)
- Add `aria-live="polite"`
- Don't attempt to show tooltip if tooltipper has since been destroyed

## 13.2.3

- Allow tooltips that failed to load the first time, to load on subsequent attempts

## 13.2.2

- Upgrade dependencies

## 13.2.1

- Make sure tooltip service is always in sync with the DOM

## 13.2.0

- Re-setup mouse events when `@mouseEvents` argument changes

## 13.1.0

- Satisfy AXE a11y test by not using `aria-describedby` attribute until the tooltip is present
- Add support for nested tooltippers
- Upgrade dependencies

## 13.0.7

- Run ember-cli-update

## 13.0.6

- Upgrade dependencies

## 13.0.5

- Upgrade dependencies
- Internal: Simplify template

## 13.0.4

- Upgrade dependencies

## 13.0.3

- Upgrade dependencies

## 13.0.2

- Upgrade dependencies

## 13.0.1

- Upgrade dependencies

## 13.0.0

- Remove `@adjust` option

## 12.0.4

- Upgrade dependencies

## 12.0.3

- Upgrade dependencies

## 12.0.2

- Fix show delay remainder regression

## 12.0.1

- Add `@onShowTooltip` and `@onHideTooltip` actions
- Internal refactor / add missing test cases

## 12.0.0

- Move arguments passed to tooltips, to a single argument 'api'.
- Expose ability to reposition a tooltip

## 11.0.2

- Add missing `@tracked` decorator to a few properties

## 11.0.1

- Upgrade dependencies

## 11.0.0

- Glimmerise component
- Drop support for Ember < 3.16

## 10.04

- Upgrade dependencies

## 10.0.3

- Remove unnecessary whitespace

## 10.0.2

- Upgrade dependencies

## 10.0.1

- Make it easier to compose new tooltips by defaulting `mouseEvents` argument to true

## 10.0.0

- Release changes from 9.1.5 beta
- Drop support for < Ember 3.11

## 9.1.5.beta.10

- Upgrade dependencies

## 9.1.5.beta-9

- Revert publish to GH

## 9.1.5.beta-8

- Publish to GH

## 9.1.5.beta-7

- Upgrade dependencies
- Switch to BEM syntax

## 9.1.5.beta-6

- Make sure tooltip state is reset when destroyed

## 9.1.5.beta-5

- Allow reference element to be changed
- Fix error if tooltipper is hidden, coordinates can't be computed

## 9.1.5.beta-4

- Fix calling `set` on destroyed object
- Add more tests

## 9.1.5.beta-3

- Further fixes to the show/hide delay in conjuction with the load delay
- Add more tests

## 9.1.5.beta-2

- Fix show/hide delay in conjuction with load delay

## 9.1.5.beta-1

- Fix show/hide delay

## 9.1.5.beta-0

- Tooltips can now be any component, and do not have to extend a base Tooltip
- No JavaScript file required (template only components preferred)
- `tool-tipper` and `tool-tip` components renamed to `tooltipper` and `tooltip`
- Tooltips now rendered inside Tooltippers by default
- `<RenderTooltips />` component removed. If you still need this behaviour, please use [ember-in-element-polyfill](https://github.com/kaliber5/ember-in-element-polyfill) instead.
- Internal migration to Angle Brackets / Named arguments / Splattributes
- `customEvents` can be removed from `app/app.js`

## 9.1.4

- Upgrade dependencies

## 9.1.3

- Upgrade dependencies

## 9.1.2

- Upgrade dependencies

## 9.1.1

- Upgrade position utils

## 9.1.0

- Introduce position adjustment behaviour. See `@adjust` in readme.

## 9.0.1

- Upgrade position utils

## 9.0.0

- Change default tag for tooltippers from a span to a div. This moves the responsilbility of block/inline to the consumer of this addon

## 8.0.4

- Upgrade deps

## 8.0.3

- Re-release

## 8.0.2

- Fudged release numbers

## 8.0.1

- Upgrade deps

## 8.0.0

- Rename `<RenderActiveTooltips />` to `<RenderTooltips />`
- Rename `hideActiveTooltips` to `hideTooltips`

## 7.2.0

- Update position library

## 7.1.0

- Small internal refactoring / linting
- Phase out the automatic-determining of button type attribute. Out of scope of this project.

## 7.0.4

- Move auto position util to external library

## 7.0.3

- Upgrade dependencies

## 7.0.2

- Import position utils instead of using global

## 7.0.1

- Upgrade dependencies

## 7.0.0

- Switch from compass points like `NE` to position strings, like `top right`
- Add more positions

## 6.0.1

- Add default rows and columns that result in the viewport being split up into 9 boxes, resulting in all possible positions.

## 6.0.0

- Change auto positioning algorithm so that: If a tooltipper is determined to be positioned in _just the west or east_ of the screen, then its tooltip will be placed in the opposite of that position.

## 5.2.4

- Add `tooltipper.toggleTooltip` action

## 5.2.3

- Upgrade ember-cli

## 5.2.2

- Add `@mouseEvents={{bool}}` ability to disable the usual behaviour of mousing over a tooltipper to get its tooltip to display. Useful if you want to manually show a tooltip on click for example.

## 5.2.1

- Introduce `tooltipService.hideActiveTooltips`. Useful if you want to manually force all tooltips to be hidden, perhaps on scroll for example

## 5.2.0

- Don't hide tooltip if moused out of tooltip, but still hovering over tooltipper

## 5.1.0

- Change `referenceElement` to be a property, rather than a function

## 5.0.2

- Introduce `referenceElement` to customise trigger element [more](https://github.com/zestia/ember-async-tooltips#custom-reference-element)

## 5.0.1

- Add noops

## 5.0.0

- Switched to camelcase args
- Split `hoverDelay` into `showDelay` and `hideDelay` for finer control

## 4.0.7

- Fix positioning of tooltips not working in Safari when the document has been scrolled.
- Fix demo app in Safari

## 4.0.6

- Adds an `is-loading` class to the tooltipper whilst it is loading the content required to display its tooltip

## 4.0.5

- Caches data when loading tooltip, so `on-load` will only fire once.
  - This caches the data on a per-tooltipper basis.
  - If you have multiple instances of the same tooltipper on a page, you will still have to have your own caching strategy for that.

## 4.0.4

- Expose `hide` action from tooltip

## 4.0.3

- Expose `hideTooltip` and `showTooltip` actions from tooltiper

## 4.0.2

- Upgrade position utils

## 4.0.1

- Upgrade position utils

## 4.0.0

- Moved position utils to a separate module
- Changed `placement` attribute to `position`

## 3.0.1

- Make on-load action more tollerant if not provided, or if it doesn't return a promise.

## 3.0.0

- Refactor to make sure correct element offsets are used
- Changes to arguments signatures in placement utils

## 2.0.0

- Remove Positionable Mixin
- Reduce reliance on jQuery

## 1.0.8

- Fix travis builds

## 1.0.7

- Upgrade dependencies

## 1.0.6

- Lint everything

## 1.0.4

- Upgrade devDependencies

## 1.0.3

- Upgrade devDependencies

## 1.0.2

- Upgrade devDependencies

## 1.0.1

- Skipped

## 1.0.0

- Update how custom placements are set

## 0.1.3

- Move ember-improved-cp to dependencies

## 0.1.2

- Add support for tabindex attribute to tooltipper component

## 0.1.1

- Fix east/west

## 0.1.0

- Initial release
