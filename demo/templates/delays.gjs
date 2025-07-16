/* eslint-disable ember/no-runloop */

import Route from 'ember-route-template';
import Tooltip from '@zestia/ember-async-tooltips/components/tooltip';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { later } from '@ember/runloop';
const { max } = Math;

class DelaysRoute extends Component {
  @tracked hideDelay = 0;
  @tracked isEager = true;
  @tracked isLoaded = false;
  @tracked isLoading = false;
  @tracked loadDuration = 200;
  @tracked loadID = 1;
  @tracked showDelay = 500;
  @tracked showTooltipper = true;

  get isLazy() {
    return !this.isEager;
  }

  get showLoading() {
    return this.isEager && this.isLoading && this.loadDuration > 0;
  }

  get totalPossibleDelay() {
    return this.loadDuration + this.showDelay;
  }

  get totalDelay() {
    if (this.isEager) {
      if (this.loadDuration > this.showDelay) {
        return this.loadDuration;
      } else {
        return this.showDelay;
      }
    }

    return this.totalPossibleDelay;
  }

  get timeSaved() {
    if (this.isEager) {
      if (this.loadDuration > this.showDelay) {
        return this.showDelay;
      } else {
        return this.loadDuration;
      }
    }

    return 0;
  }

  get actualShowDelay() {
    if (this.isEager) {
      return max(this.showDelay - this.loadDuration, 0);
    }

    return this.showDelay;
  }

  setEager = ({ target: { checked } }) => {
    this.isEager = checked;
  };

  setShowDelay = ({ target: { value } }) => {
    this.showDelay = parseInt(value || 0, 10);
  };

  setHideDelay = ({ target: { value } }) => {
    this.hideDelay = parseInt(value || 0, 10);
  };

  setLoadDuration = ({ target: { value } }) => {
    this.loadDuration = parseInt(value || 0, 10);
  };

  load = () => {
    this.isLoading = true;

    return new Promise((resolve) => {
      later(() => {
        this.isLoading = false;
        this.isLoaded = true;
        resolve({ message: `Hello World ${this.loadID}` });
      }, this.loadDuration);
    });
  };

  unload = () => {
    this.isLoaded = false;
    this.loadID++;
  };

  <template>
    <p>
      The total possible delay is
      {{this.totalPossibleDelay}}ms.
      <span class={{if this.isLazy "strike"}}>
        The addon saves
        {{this.timeSaved}}ms</span>, resulting in a total delay of
      {{this.totalDelay}}ms.<br />
      <span class={{if this.isLazy "strike"}}>
        This is because the actual show delay is reduced to
        {{this.actualShowDelay}}ms.
      </span>
    </p>

    <form>
      <p>
        <label>
          <input
            type="checkbox"
            checked={{this.isEager}}
            {{on "click" this.setEager}}
          />
          Eager
        </label>
      </p>
      <p>
        <label>
          <input
            type="text"
            value={{this.showDelay}}
            size="4"
            {{on "input" this.setShowDelay}}
          />
          Show delay
        </label>
      </p>
      <p>
        <label>
          <input
            type="text"
            value={{this.hideDelay}}
            size="4"
            {{on "input" this.setHideDelay}}
          />
          Hide delay
        </label>
      </p>
      <p>
        <label>
          <input
            type="text"
            value={{this.loadDuration}}
            size="4"
            {{on "input" this.setLoadDuration}}
          />
          Load duration
        </label>
      </p>
      <p>
        <button
          type="button"
          disabled={{if this.isLoaded false true}}
          {{on "click" this.unload}}
        >
          Unload
        </button>
      </p>
    </form>

    {{#if this.showTooltipper}}
      <div>
        Hover over me

        {{#if this.showLoading}}
          (Loading...)
        {{/if}}

        {{this.loadID}}

        <Tooltip
          @onLoad={{this.load}}
          @loadID={{this.loadID}}
          @eager={{this.isEager}}
          @showDelay={{this.showDelay}}
          @hideDelay={{this.hideDelay}}
          @position="bottom center"
          as |tooltip|
        >
          {{#if tooltip.isLoading}}
            Loading...
          {{else}}
            {{tooltip.data.message}}
          {{/if}}
        </Tooltip>
      </div>
    {{/if}}
  </template>
}

export default Route(DelaysRoute);
