'use strict';

module.exports = {
  plugins: ['@zestia/template-lint-config'],
  extends: 'zestia:recommended',

  rules: {
    'no-capital-arguments': 'off'
  }
};
