import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { g, i } from 'decorator-transforms/runtime-esm';

class TooltipService extends Service {
  tooltips = [];
  static {
    g(this.prototype, "_sticky", [tracked], function () {
      return {};
    });
  }
  #_sticky = (i(this, "_sticky"), void 0);
  hideAllTooltips = () => {
    return Promise.all(this.tooltips.map(tooltip => tooltip.hide()));
  };
  _add = tooltip => {
    this.tooltips.push(tooltip);
  };
  _remove = tooltip => {
    this.tooltips.splice(this.tooltips.indexOf(tooltip), 1);
  };
  _setSticky = (tooltip, value) => {
    this._sticky[tooltip.args.stickyID] = value;
    this._sticky = {
      ...this._sticky
    };
  };
}

export { TooltipService as default };
//# sourceMappingURL=tooltip.js.map
