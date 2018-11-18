'use strict';

module.exports = {
  name: require('./package').name, // eslint-disable-line global-require

  included(app) {
    app.import('node_modules/@zestia/position-utils/index.js');
  }
};
