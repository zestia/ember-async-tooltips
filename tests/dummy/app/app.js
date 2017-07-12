import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

const app = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,

  customEvents: {
    webkitAnimationEnd: 'animationEnd',
    msAnimationEnd: 'animationEnd',
    oAnimationEnd: 'animationEnd',
    animationend: 'animationEnd'
  }
});

loadInitializers(app, config.modulePrefix);

export default app;
