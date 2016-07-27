'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aureliaLoaderDefault = require('./aurelia-loader-default');

Object.keys(_aureliaLoaderDefault).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaLoaderDefault[key];
    }
  });
});