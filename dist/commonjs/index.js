"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var _inherits = function (child, parent) {
  if (typeof parent !== "function" && parent !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof parent);
  }
  child.prototype = Object.create(parent && parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (parent) child.__proto__ = parent;
};

var Origin = require("aurelia-metadata").Origin;
var Loader = require("aurelia-loader").Loader;
var join = require("aurelia-path").join;


var originalInstantiate = System.instantiate.bind(System);

System.instantiate = function (load) {
  return originalInstantiate(load).then(function (m) {
    var execute = m.execute;

    m.execute = function () {
      var executed = execute.apply(m, arguments), key, exportedValue;
      var target = executed;

      if (target.__useDefault) {
        target = target["default"];
      }

      if (target === window) {
        return executed;
      }

      if (!Object.isFrozen(target)) {
        Origin.set(target, new Origin(load.name, "default"));
      }

      for (key in target) {
        exportedValue = target[key];

        if (typeof exportedValue === "function") {
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
    this.baseUrl = System.baseUrl;
    this.baseViewUrl = System.baseViewUrl || System.baseUrl;
  };

  _inherits(SystemJSLoader, Loader);

  _prototypeProperties(SystemJSLoader, null, {
    loadModule: {
      value: function (id, baseUrl) {
        baseUrl = baseUrl === undefined ? this.baseUrl : baseUrl;

        if (baseUrl && !id.startsWith(baseUrl)) {
          id = join(baseUrl, id);
        }

        return System["import"](id);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    loadAllModules: {
      value: function (ids) {
        var loads = [], i, ii, loader = this.loader;

        for (i = 0, ii = ids.length; i < ii; ++i) {
          loads.push(this.loadModule(ids[i]));
        }

        return Promise.all(loads);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    loadTemplate: {
      value: function (url) {
        if (this.baseViewUrl && !url.startsWith(this.baseViewUrl)) {
          url = join(this.baseViewUrl, url);
        }

        return this.importTemplate(url);
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return SystemJSLoader;
})(Loader);

exports.SystemJSLoader = SystemJSLoader;