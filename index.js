'use strict';

module.exports = {
  name: '@zestia/ember-async-tooltips',

  included(app) {
    app.import('node_modules/@zestia/position-utils/index.js');
  }
};
