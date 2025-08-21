import Application from '@ember/application';
import Resolver from 'ember-resolver';
import config from './config.js';
import * as Router from './router.js';
import * as ApplicationTemplate from './templates/application.gjs';
import * as IndexTemplate from './templates/index.gjs';
import * as ManualTemplate from './templates/manual.gjs';
import * as ReferenceTemplate from './templates/reference.gjs';
import * as DestinationTemplate from './templates/destination.gjs';
import * as AttachToTemplate from './templates/attach-to.gjs';
import * as NestingTemplate from './templates/nesting.gjs';
import * as DelaysTemplate from './templates/delays.gjs';
import * as ManualPositionTemplate from './templates/manual-position.gjs';
import * as AutoPositionTemplate from './templates/auto-position.gjs';
import * as StickyTemplate from './templates/sticky.gjs';
import * as TetherTemplate from './templates/tether.gjs';
import * as UseClickTemplate from './templates/use-click.gjs';
import * as UseFocusTemplate from './templates/use-focus.gjs';
import * as TooltipService from '@zestia/ember-async-tooltips/services/tooltip';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  Resolver = Resolver.withModules({
    'demo/router': Router,
    'demo/templates/application': ApplicationTemplate,
    'demo/templates/index': IndexTemplate,
    'demo/templates/manual': ManualTemplate,
    'demo/templates/reference': ReferenceTemplate,
    'demo/templates/destination': DestinationTemplate,
    'demo/templates/attach-to': AttachToTemplate,
    'demo/templates/nesting': NestingTemplate,
    'demo/templates/delays': DelaysTemplate,
    'demo/templates/manual-position': ManualPositionTemplate,
    'demo/templates/auto-position': AutoPositionTemplate,
    'demo/templates/sticky': StickyTemplate,
    'demo/templates/tether': TetherTemplate,
    'demo/templates/use-click': UseClickTemplate,
    'demo/templates/use-focus': UseFocusTemplate,
    'demo/services/tooltip': TooltipService
  });
}
