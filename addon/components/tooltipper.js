import Component from '@ember/component';
import { computed, set, getWithDefault } from '@ember/object';
import { cancel, debounce } from '@ember/runloop';
import { getPosition, getCoords } from '@zestia/position-utils';
import { guidFor } from '@ember/object/internals';
import { htmlSafe, dasherize } from '@ember/string';
import { inject } from '@ember/service';
import { resolve } from 'rsvp';
import autoPosition from '../utils/auto-position';
import layout from '../templates/components/tooltipper';

export default Component.extend({
  tooltipService: inject('tooltip'),

  layout,
  tagName: '',

  // Arguments

  adjust: false,
  columns: 3,
  hideDelay: 0,
  mouseEvents: true,
  position: null,
  rows: 3,
  showDelay: 0,
  showTooltip: null,
  tooltip: null,
  referenceElement: null,

  // State

  computedReferenceElement: null,
  coords: null,
  hideTimer: null,
  id: null,
  isLoaded: false,
  isLoading: false,
  isOverReferenceElement: false,
  isOverTooltipElement: false,
  isShowingTooltip: false,
  loadedData: null,
  loadEndTime: 0,
  loadError: null,
  loadStartTime: 0,
  previousReferenceElement: null,
  renderTooltip: false,
  showTimer: null,
  tooltipElement: null,
  tooltipperElement: null,

  // Computed state

  tooltipComponent: computed('tooltip', function() {
    return this.tooltip || 'tooltip';
  }),

  tooltipStyle: computed('coords', function() {
    return htmlSafe(`top: ${this.coords.top}px; left: ${this.coords.left}px`);
  }),

  tooltipPosition: computed('coords.position', function() {
    return dasherize(this.coords.position);
  }),

  loadDelay: computed('loadStartTime', 'loadEndTime', function() {
    return this.loadEndTime - this.loadStartTime;
  }),

  showDelayRemainder: computed('loadDelay', 'showDelay', function() {
    const maxDelay = getWithDefault(this, 'showDelay', 0);
    return this.loadDelay > maxDelay ? 0 : maxDelay - this.loadDelay;
  }),

  init() {
    this._super(...arguments);
    set(this, 'coords', { top: 0, left: 0, position: '' });
    set(this, 'id', guidFor(this).replace('ember', ''));
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this._autoSetupReferenceElement();
    this._positionTooltip();
    this._toggleViaArgument();
  },

  actions: {
    // Internal actions

    didInsertTooltipper(element) {
      set(this, 'tooltipperElement', element);
      this._autoSetupReferenceElement();
    },

    willDestroyTooltipper() {
      this._cancelShowTooltip();
      this._cancelHideTooltip();
      this._autoTearDownReferenceElement();
    },

    didInsertTooltip(element) {
      set(this, 'tooltipElement', element);
      this._positionTooltip();
    },

    didUpdateTooltip() {
      this._positionTooltip();
    },

    willDestroyTooltip() {
      set(this, 'tooltipElement', null);
      set(this, 'isOverTooltipElement', false);
    },

    onMouseEnterTooltip() {
      set(this, 'isOverTooltipElement', true);
    },

    onMouseLeaveTooltip() {
      set(this, 'isOverTooltipElement', false);

      if (this.mouseEvents) {
        this._scheduleHideTooltipFromHover();
      }
    },

    // Public API Actions

    hideTooltip() {
      return this._hideTooltip();
    },

    showTooltip() {
      this._showTooltip();
    },

    toggleTooltip() {
      if (this.renderTooltip) {
        this._hideTooltip();
      } else {
        this._showTooltip();
      }
    }
  },

  _toggleViaArgument() {
    if (this.showTooltip === true) {
      this._showTooltip();
    } else if (this.showTooltip === false) {
      this._hideTooltip();
    }
  },

  _startListening(element) {
    set(this, '_enterHandler', this._mouseEnterReferenceElement.bind(this));
    set(this, '_leaveHandler', this._mouseLeaveReferenceElement.bind(this));

    element.addEventListener('mouseenter', this._enterHandler);
    element.addEventListener('mouseleave', this._leaveHandler);
  },

  _stopListening(element) {
    element.removeEventListener('mouseenter', this._enterHandler);
    element.removeEventListener('mouseleave', this._leaveHandler);
  },

  _mouseEnterReferenceElement() {
    set(this, 'isOverReferenceElement', true);

    this._scheduleShowTooltipFromHover();
  },

  _mouseLeaveReferenceElement() {
    set(this, 'isOverReferenceElement', false);

    this._scheduleHideTooltipFromHover();
  },

  _load() {
    const action =
      this.isLoaded || typeof this.onLoad !== 'function'
        ? this._onLoad.bind(this)
        : this.onLoad;

    this._loadStarted();
    return resolve(action())
      .then(this._loadedData.bind(this))
      .catch(this._loadError.bind(this))
      .finally(this._loadFinished.bind(this));
  },

  _onLoad() {
    return this.loadedData;
  },

  _loadStarted() {
    set(this, 'loadStartTime', Date.now());
    set(this, 'isLoading', true);
  },

  _loadFinished() {
    if (this.isDestroyed) {
      return;
    }

    set(this, 'isLoading', false);
    set(this, 'loadEndTime', Date.now());
  },

  _loadedData(data) {
    if (this.isDestroyed) {
      return;
    }

    set(this, 'loadedData', data);
    set(this, 'isLoaded', true);
  },

  _loadError(error) {
    if (this.isDestroyed) {
      return;
    }

    set(this, 'loadError', error);
  },

  _scheduleShowTooltipFromHover() {
    if (this.isLoading) {
      return;
    }

    this._load().then(this._attemptShowTooltipFromHover.bind(this));
  },

  _attemptShowTooltipFromHover() {
    if (this.isDestroyed || !this.isOverReferenceElement) {
      return;
    }

    this._scheduleShowTooltip();
  },

  _scheduleShowTooltip() {
    this._cancelHideTooltip();

    set(
      this,
      'showTimer',
      debounce(this, '_showTooltip', this.showDelayRemainder)
    );
  },

  _cancelShowTooltip() {
    cancel(this.showTimer);
  },

  _showTooltip() {
    if (this.isDestroyed || this.renderTooltip) {
      return;
    }

    this._load().then(this._renderTooltip.bind(this));
  },

  _renderTooltip() {
    if (this.isDestroyed) {
      return;
    }

    set(this, 'isShowingTooltip', true);
    set(this, 'renderTooltip', true);

    this.tooltipService.add(this);
  },

  _scheduleHideTooltipFromHover() {
    this._cancelShowTooltip();

    set(
      this,
      'hideTimer',
      debounce(this, '_attemptHideTooltipFromHover', this.hideDelay)
    );
  },

  _cancelHideTooltip() {
    cancel(this.hideTimer);
  },

  _attemptHideTooltipFromHover() {
    if (this.isOverReferenceElement || this.isOverTooltipElement) {
      return;
    }

    this._hideTooltip();
  },

  _hideTooltip() {
    if (this.isDestroyed || !this.tooltipElement) {
      return;
    }

    return new Promise(resolve => {
      this.tooltipElement.addEventListener('animationend', resolve, {
        once: true
      });

      set(this, 'isShowingTooltip', false);
    }).then(this._destroyTooltip.bind(this));
  },

  _destroyTooltip() {
    this.tooltipService.remove(this);

    if (this.isDestroyed) {
      return;
    }

    set(this, 'renderTooltip', false);
  },

  _autoSetupReferenceElement() {
    set(
      this,
      'computedReferenceElement',
      this.referenceElement || this.tooltipperElement
    );

    if (
      !this.computedReferenceElement ||
      this.computedReferenceElement === this.previousReferenceElement
    ) {
      return;
    }

    if (this.previousReferenceElement) {
      this._teardownReferenceElement(this.previousReferenceElement);
    }

    set(this, 'previousReferenceElement', this.computedReferenceElement);

    this._setupReferenceElement(this.computedReferenceElement);
  },

  _autoTearDownReferenceElement() {
    this._teardownReferenceElement(this.computedReferenceElement);
  },

  _setupReferenceElement(element) {
    if (!this.mouseEvents) {
      return;
    }

    this._startListening(element);
  },

  _teardownReferenceElement(element) {
    if (!this.mouseEvents) {
      return;
    }

    this._stopListening(element);
  },

  _positionTooltip() {
    const element = this.tooltipElement;
    const reference = this.computedReferenceElement;

    if (!element || !reference) {
      return;
    }

    const container = this.adjust ? window : null;

    // Get the rough position of the reference element in the window by
    // splitting it in to a grid of rows and columns and choosing a square.
    const refPosition = getPosition(reference, window, this.columns, this.rows);

    // The position of the tooltip should be the one provided, or one based
    // upon the position of the reference element, that the tooltip is for.
    const position = this.position ? this.position : autoPosition(refPosition);

    try {
      // Compute the coordinates required to place the tooltip near the reference
      // element. And, if a container is provided, attempt to adjust the position
      // further to make sure it is always visible.
      set(this, 'coords', getCoords(position, element, reference, container));
    } catch (error) {
      // The reference element was probably hidden, therefore it's not possible
      // to compute coordinates.
    }
  }
});
