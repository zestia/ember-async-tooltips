/* eslint-disable array-callback-return */

import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('manual');
  this.route('reference');
  this.route('parent');
  this.route('nesting');
  this.route('delays');
  this.route('manual-position');
  this.route('auto-position');
  this.route('in-element');
  this.route('interactive-content');
  this.route('sticky');
});
