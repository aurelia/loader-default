"use strict";

var _extends = function (child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  child.__proto__ = parent;
};

var Origin = require('aurelia-metadata').Origin;
var normalize = require('aurelia-metadata').normalize;
var Loader = require('aurelia-loader').Loader;


var originalInstantiate = System.instantiate.bind(System);

System.instantiate = function (load) {
  return originalInstantiate(load).then(function (m) {
    var execute = m.execute;

    m.execute = function () {
      var executed = execute.apply(m, arguments), key, exportedValue;

      for (key in executed) {
        exportedValue = executed[key];

        if (typeof exportedValue === "function") {
          normalize(exportedValue);
          Origin.set(exportedValue, new Origin(load.name, key));
        }
      }

      return executed;
    };

    return m;
  });
};

Loader.createDefaultLoader = function () {
  return new SystemJSLoader();
};

var SystemJSLoader = (function (Loader) {
  var SystemJSLoader = function SystemJSLoader() {
    Loader.apply(this, arguments);
  };

  _extends(SystemJSLoader, Loader);

  SystemJSLoader.prototype.loadModule = function (id) {
    return System["import"](id);
  };

  SystemJSLoader.prototype.loadAllModules = function (ids) {
    var loads = [], i, ii, loader = this.loader;

    for (i = 0, ii = ids.length; i < ii; ++i) {
      loads.push(System["import"](ids[i]));
    }

    return Promise.all(loads);
  };

  SystemJSLoader.prototype.getBaseUrl = function () {
    return System.baseUrl;
  };

  return SystemJSLoader;
})(Loader);

exports.SystemJSLoader = SystemJSLoader;