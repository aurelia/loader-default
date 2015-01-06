define(["exports", "aurelia-metadata", "aurelia-loader", "aurelia-path"], function (exports, _aureliaMetadata, _aureliaLoader, _aureliaPath) {
  "use strict";

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

  var Origin = _aureliaMetadata.Origin;
  var Loader = _aureliaLoader.Loader;
  var join = _aureliaPath.join;


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

  var SystemJSLoader = (function () {
    var _Loader = Loader;
    var SystemJSLoader = function SystemJSLoader() {
      this.baseUrl = System.baseUrl;
      this.baseViewUrl = System.baseViewUrl || System.baseUrl;
    };

    _inherits(SystemJSLoader, _Loader);

    SystemJSLoader.prototype.loadModule = function (id, baseUrl) {
      baseUrl = baseUrl === undefined ? this.baseUrl : baseUrl;

      if (baseUrl && !id.startsWith(baseUrl)) {
        id = join(baseUrl, id);
      }

      return System["import"](id);
    };

    SystemJSLoader.prototype.loadAllModules = function (ids) {
      var loads = [], i, ii, loader = this.loader;

      for (i = 0, ii = ids.length; i < ii; ++i) {
        loads.push(this.loadModule(ids[i]));
      }

      return Promise.all(loads);
    };

    SystemJSLoader.prototype.loadTemplate = function (url) {
      if (this.baseViewUrl && !url.startsWith(this.baseViewUrl)) {
        url = join(this.baseViewUrl, url);
      }

      return this.importTemplate(url);
    };

    return SystemJSLoader;
  })();

  exports.SystemJSLoader = SystemJSLoader;
});