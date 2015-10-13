System.register(['aurelia-loader', 'aurelia-pal', 'aurelia-metadata'], function (_export) {
  'use strict';

  var TemplateRegistryEntry, Loader, DOM, PLATFORM, Origin, TextTemplateLoader, DefaultLoader;

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function ensureOriginOnExports(executed, name) {
    var target = executed;
    var key = undefined;
    var exportedValue = undefined;

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
      TextTemplateLoader = (function () {
        function TextTemplateLoader() {
          _classCallCheck(this, TextTemplateLoader);
        }

        TextTemplateLoader.prototype.loadTemplate = function loadTemplate(loader, entry) {
          return loader.loadText(entry.address).then(function (text) {
            entry.setTemplate(DOM.createTemplateFromMarkup(text));
          });
        };

        return TextTemplateLoader;
      })();

      _export('TextTemplateLoader', TextTemplateLoader);

      DefaultLoader = (function (_Loader) {
        _inherits(DefaultLoader, _Loader);

        function DefaultLoader() {
          _classCallCheck(this, DefaultLoader);

          _Loader.call(this);

          this.textPluginName = 'text';
          this.moduleRegistry = {};
          this.useTemplateLoader(new TextTemplateLoader());

          var that = this;

          this.addPlugin('template-registry-entry', {
            'fetch': function fetch(address) {
              var entry = that.getOrCreateTemplateRegistryEntry(address);
              return entry.templateIsLoaded ? entry : that.templateLoader.loadTemplate(that, entry).then(function (x) {
                return entry;
              });
            }
          });
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
          return this._import(this.applyPluginToUrl(url, this.textPluginName));
        };

        return DefaultLoader;
      })(Loader);

      _export('DefaultLoader', DefaultLoader);

      PLATFORM.Loader = DefaultLoader;

      if (!PLATFORM.global.System || !PLATFORM.global.System['import']) {
        if (PLATFORM.global.requirejs && requirejs.s && requirejs.s.contexts && requirejs.s.contexts._ && requirejs.s.contexts._.defined) {
          (function () {
            var defined = requirejs.s.contexts._.defined;
            PLATFORM.eachModule = function (callback) {
              for (var key in defined) {
                if (callback(key, defined[key])) return;
              }
            };
          })();
        } else {
          PLATFORM.eachModule = function (callback) {};
        }

        DefaultLoader.prototype._import = function (moduleId) {
          return new Promise(function (resolve, reject) {
            require([moduleId], resolve, reject);
          });
        };

        DefaultLoader.prototype.loadModule = function (id) {
          var _this = this;

          var existing = this.moduleRegistry[id];
          if (existing) {
            return Promise.resolve(existing);
          }

          return new Promise(function (resolve, reject) {
            require([id], function (m) {
              _this.moduleRegistry[newId] = m;
              resolve(ensureOriginOnExports(m, newId));
            }, reject);
          });
        };

        DefaultLoader.prototype.map = function (id, source) {};

        DefaultLoader.prototype.normalizeSync = function (moduleId, relativeTo) {
          return moduleId;
        };

        DefaultLoader.prototype.applyPluginToUrl = function (url, pluginName) {
          return pluginName + '!' + url;
        };

        DefaultLoader.prototype.addPlugin = function (pluginName, implementation) {
          define(pluginName, [], {
            'load': function load(name, req, onload) {
              var address = req.toUrl(name);
              var result = implementation.fetch(address);
              Promise.resolve(result).then(onload);
            }
          });
        };
      } else {
        (function () {
          var modules = System._loader.modules;

          PLATFORM.eachModule = function (callback) {
            for (var key in modules) {
              if (callback(key, modules[key].module)) return;
            }
          };

          System.set('text', System.newModule({
            'translate': function translate(load) {
              return 'module.exports = "' + load.source.replace(/(["\\])/g, '\\$1').replace(/[\f]/g, '\\f').replace(/[\b]/g, '\\b').replace(/[\n]/g, '\\n').replace(/[\t]/g, '\\t').replace(/[\r]/g, '\\r').replace(/[\u2028]/g, '\\u2028').replace(/[\u2029]/g, '\\u2029') + '";';
            }
          }));

          DefaultLoader.prototype._import = function (moduleId) {
            return System['import'](moduleId);
          };

          DefaultLoader.prototype.loadModule = function (id) {
            var _this2 = this;

            var newId = System.normalizeSync(id);
            var existing = this.moduleRegistry[newId];

            if (existing) {
              return Promise.resolve(existing);
            }

            return System['import'](newId).then(function (m) {
              _this2.moduleRegistry[newId] = m;
              return ensureOriginOnExports(m, newId);
            });
          };

          DefaultLoader.prototype.map = function (id, source) {
            System.map[id] = source;
          };

          DefaultLoader.prototype.normalizeSync = function (moduleId, relativeTo) {
            return System.normalizeSync(moduleId, relativeTo);
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
        })();
      }
    }
  };
});