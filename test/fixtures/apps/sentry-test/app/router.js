'use strict';

const assert = require('assert');

module.exports = app => {
  app.get('/', function* () {
    assert(false);
  });
};
