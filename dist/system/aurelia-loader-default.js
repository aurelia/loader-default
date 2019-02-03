'use strict';

System.register(['aurelia-loader', 'aurelia-pal', 'aurelia-metadata'], function (_export, _context) {
  "use strict";

  var TemplateRegistryEntry, Loader, DOM, PLATFORM, Origin, _typeof, TextTemplateLoader, DefaultLoader, getDefined;

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  

  function ensureOriginOnExports(executed, name) {
    var target = executed;
    var key = void 0;
    var exportedValue = void 0;

    if (target.__useDefault) {
      target = target['default'];
    }

    Origin.set(target, new Origin(name, 'default'));

    for (key in target) {
      exportedValue = target[key];

      if (typeof exportedValue === 'function') {
        Origin.set(exportedValue, new Origin(name, key));
      }
    }

    return executed;
  }

  return {
    setters: [function (_aureliaLoader) {
      TemplateRegistryEntry = _aureliaLoader.TemplateRegistryEntry;
      Loader = _aureliaLoader.Loader;
    }, function (_aureliaPal) {
      DOM = _aureliaPal.DOM;
      PLATFORM = _aureliaPal.PLATFORM;
    }, function (_aureliaMetadata) {
      Origin = _aureliaMetadata.Origin;
    }],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      _export('TextTemplateLoader', TextTemplateLoader = function () {
        function TextTemplateLoader() {
          
        }

        TextTemplateLoader.prototype.loadTemplate = function loadTemplate(loader, entry) {
          return loader.loadText(entry.address).then(function (text) {
            entry.template = DOM.createTemplateFromMarkup(text);
          });
        };

        return TextTemplateLoader;
      }());

      _export('TextTemplateLoader', TextTemplateLoader);

      _export('DefaultLoader', DefaultLoader = function (_Loader) {
        _inherits(DefaultLoader, _Loader);

        function DefaultLoader() {
          

          var _this = _possibleConstructorReturn(this, _Loader.call(this));

          _this.textPluginName = 'text';


          _this.moduleRegistry = Object.create(null);
          _this.useTemplateLoader(new TextTemplateLoader());

          var that = _this;

          _this.addPlugin('template-registry-entry', {
            'fetch': function fetch(address) {
              var entry = that.getOrCreateTemplateRegistryEntry(address);
              return entry.templateIsLoaded ? entry : that.templateLoader.loadTemplate(that, entry).then(function (x) {
                return entry;
              });
            }
          });
          return _this;
        }

        DefaultLoader.prototype.useTemplateLoader = function useTemplateLoader(templateLoader) {
          this.templateLoader = templateLoader;
        };

        DefaultLoader.prototype.loadAllModules = function loadAllModules(ids) {
          var loads = [];

          for (var i = 0, ii = ids.length; i < ii; ++i) {
            loads.push(this.loadModule(ids[i]));
          }

          return Promise.all(loads);
        };

        DefaultLoader.prototype.loadTemplate = function loadTemplate(url) {
          return this._import(this.applyPluginToUrl(url, 'template-registry-entry'));
        };

        DefaultLoader.prototype.loadText = function loadText(url) {
          return this._import(this.applyPluginToUrl(url, this.textPluginName)).then(function (textOrModule) {
            if (typeof textOrModule === 'string') {
              return textOrModule;
            }

            return textOrModule['default'];
          });
        };

        return DefaultLoader;
      }(Loader));

      _export('DefaultLoader', DefaultLoader);

      PLATFORM.Loader = DefaultLoader;

      if (!PLATFORM.global.System || !PLATFORM.global.System.import) {
        if (PLATFORM.global.requirejs) {
          getDefined = void 0;

          if (_typeof(PLATFORM.global.requirejs.s) === 'object') {
            getDefined = function getDefined() {
              return PLATFORM.global.requirejs.s.contexts._.defined;
            };
          } else if (_typeof(PLATFORM.global.requirejs.contexts) === 'object') {
            getDefined = function getDefined() {
              return PLATFORM.global.requirejs.contexts._.defined;
            };
          } else if (typeof PLATFORM.global.requirejs.definedValues === 'function') {
            getDefined = function getDefined() {
              return PLATFORM.global.requirejs.definedValues();
            };
          } else {
            getDefined = function getDefined() {
              return {};
            };
          }
          PLATFORM.eachModule = function (callback) {
            var defined = getDefined();
            for (var key in defined) {
              try {
                if (callback(key, defined[key])) return;
              } catch (e) {}
            }
          };
        } else {
          PLATFORM.eachModule = function (callback) {};
        }

        DefaultLoader.prototype._import = function (moduleId) {
          return new Promise(function (resolve, reject) {
            PLATFORM.global.require([moduleId], resolve, reject);
          });
        };

        DefaultLoader.prototype.loadModule = function (id) {
          var _this2 = this;

          var existing = this.moduleRegistry[id];
          if (existing !== undefined) {
            return Promise.resolve(existing);
          }

          return new Promise(function (resolve, reject) {
            PLATFORM.global.require([id], function (m) {
              _this2.moduleRegistry[id] = m;
              resolve(ensureOriginOnExports(m, id));
            }, reject);
          });
        };

        DefaultLoader.prototype.map = function (id, source) {};

        DefaultLoader.prototype.normalize = function (moduleId, relativeTo) {
          return Promise.resolve(moduleId);
        };

        DefaultLoader.prototype.normalizeSync = function (moduleId, relativeTo) {
          return moduleId;
        };

        DefaultLoader.prototype.applyPluginToUrl = function (url, pluginName) {
          return pluginName + '!' + url;
        };

        DefaultLoader.prototype.addPlugin = function (pluginName, implementation) {
          var nonAnonDefine = define;
          nonAnonDefine(pluginName, [], {
            'load': function load(name, req, onload) {
              var result = implementation.fetch(name);
              Promise.resolve(result).then(onload);
            }
          });
        };
      } else {
        PLATFORM.eachModule = function (callback) {
          if (System.registry) {
            var keys = Array.from(System.registry.keys());
            for (var i = 0; i < keys.length; i++) {
              try {
                var key = keys[i];
                if (callback(key, System.registry.get(key))) {
                  return;
                }
              } catch (e) {}
            }
            return;
          }

          var modules = System._loader.modules;

          for (var _key in modules) {
            try {
              if (callback(_key, modules[_key].module)) return;
            } catch (e) {}
          }
        };

        DefaultLoader.prototype._import = function (moduleId) {
          return System.import(moduleId);
        };

        DefaultLoader.prototype.loadModule = function (id) {
          var _this3 = this;

          return System.normalize(id).then(function (newId) {
            var existing = _this3.moduleRegistry[newId];
            if (existing !== undefined) {
              return Promise.resolve(existing);
            }

            return System.import(newId).then(function (m) {
              _this3.moduleRegistry[newId] = m;
              return ensureOriginOnExports(m, newId);
            });
          });
        };

        DefaultLoader.prototype.map = function (id, source) {
          var _map;

          System.config({ map: (_map = {}, _map[id] = source, _map) });
        };

        DefaultLoader.prototype.normalizeSync = function (moduleId, relativeTo) {
          return System.normalizeSync(moduleId, relativeTo);
        };

        DefaultLoader.prototype.normalize = function (moduleId, relativeTo) {
          return System.normalize(moduleId, relativeTo);
        };

        DefaultLoader.prototype.applyPluginToUrl = function (url, pluginName) {
          return url + '!' + pluginName;
        };

        DefaultLoader.prototype.addPlugin = function (pluginName, implementation) {
          System.set(pluginName, System.newModule({
            'fetch': function fetch(load, _fetch) {
              var result = implementation.fetch(load.address);
              return Promise.resolve(result).then(function (x) {
                load.metadata.result = x;
                return '';
              });
            },
            'instantiate': function instantiate(load) {
              return load.metadata.result;
            }
          }));
        };
      }
    }
  };
});