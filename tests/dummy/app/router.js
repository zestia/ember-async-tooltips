import Router from '@ember/routing/router';
import config from './config/environment';

const DummyRouter = Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

DummyRouter.map(function() {
  this.route('simple');
  this.route('reference');
  this.route('position');
});

export default DummyRouter;
