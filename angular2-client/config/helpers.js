'use strict';

const path = require('path');

exports.root = function(dir) {
  return path.resolve(__dirname, '..', dir);
}
