/* eslint-disable array-callback-return */

import EmberApp from '@ember/application';
import Resolver from 'ember-resolver';
import EmberRouter from '@ember/routing/router';
import TooltipService from '@zestia/ember-async-tooltips/services/tooltip';
import '../demo/styles/app.scss';

class Router extends EmberRouter {
  location = 'none';
  rootURL = '/';
}

class TestApp extends EmberApp {
  modulePrefix = 'test-app';
  Resolver = Resolver.withModules({
    'test-app/router': { default: Router },
    'test-app/services/tooltip': TooltipService
  });
}

Router.map(function () {});

import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start as qunitStart, setupEmberOnerrorValidation } from 'ember-qunit';

export function start() {
  setApplication(
    TestApp.create({
      autoboot: false,
      rootElement: '#ember-testing'
    })
  );
  setup(QUnit.assert);
  setupEmberOnerrorValidation();
  qunitStart();
}
