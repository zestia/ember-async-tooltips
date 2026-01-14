import EmberApp from 'ember-strict-application-resolver';
import EmberRouter from '@ember/routing/router';
import PageTitleService from 'ember-page-title/services/page-title';
import * as TooltipService from '@zestia/ember-async-tooltips/services/tooltip';

class Router extends EmberRouter {
  location = 'history';
  rootURL = '/';
}

Router.map(function () {
  this.route('manual');
  this.route('reference');
  this.route('nesting');
  this.route('delays');
  this.route('manual-position');
  this.route('auto-position');
  this.route('destination');
  this.route('attach-to');
  this.route('sticky');
  this.route('tether');
  this.route('use-click');
  this.route('use-focus');
});

export class App extends EmberApp {
  /**
   * Any services or anything from the addon that needs to be in the app-tree registry
   * will need to be manually specified here.
   *
   * Techniques to avoid needing this:
   * - private services
   * - require the consuming app import and configure themselves
   *   (which is what we're emulating here)
   */
  modules = {
    './router': Router,
    './services/page-title': PageTitleService,
    './services/tooltip': TooltipService,
    /**
     * NOTE: this glob will import everything matching the glob,
     *     and includes non-services in the services directory.
     */
    ...import.meta.glob('./services/**/*', { eager: true }),
    /**
     * These imports are not magic, but we do require that all entries in the
     * modules object match a ./[type]/[name] pattern.
     *
     * See: https://rfcs.emberjs.com/id/1132-default-strict-resolver
     */
    ...import.meta.glob('./templates/**/*', { eager: true }),
  };
}

Router.map(function () {});
