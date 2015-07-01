import {Origin} from 'aurelia-metadata';
import {Loader} from 'aurelia-loader';

let polyfilled = false;

if(!window.System || !window.System.import){
  var sys = window.System = window.System || {};

  sys.polyfilled = polyfilled = true;
  sys.isFake = false;
  sys.map = {};

  sys['import'] = function(moduleId){
    return new Promise((resolve, reject) => {
      require([moduleId], resolve, reject);
    });
  };

  sys.normalize = function(url){
    return Promise.resolve(url);
  };

  if(window.requirejs && requirejs.s && requirejs.s.contexts && requirejs.s.contexts._ && requirejs.s.contexts._.defined) {
    var defined = requirejs.s.contexts._.defined;
    sys.forEachModule = function(callback){
      for(var key in defined){
        if(callback(key, defined[key])) return;
      }
    };
  }else{
    sys.forEachModule = function(callback){};
  }
}else{
  var modules = System._loader.modules;

  System.isFake = false;
  System.forEachModule = function(callback){
    for (var key in modules) {
      if(callback(key, modules[key].module)) return;
    }
  };
}

function ensureOriginOnExports(executed, name){
  var target = executed,
      key, exportedValue;

  if(target.__useDefault){
    target = target['default'];
  }

  Origin.set(target, new Origin(name, 'default'));

  for (key in target) {
    exportedValue = target[key];

    if (typeof exportedValue === "function") {
      Origin.set(exportedValue, new Origin(name, key));
    }
  }

  return executed;
}

export class DefaultLoader extends Loader {
  constructor(){
    super();

    this.moduleRegistry = {};
    var that = this;

    if(polyfilled){
      define('view', [], {
        'load': function (name, req, onload, config) {
          var entry = that.getOrCreateTemplateRegistryEntry(name),
              address;

          if(entry.templateIsLoaded){
            onload(entry);
            return;
          }

          that.findBundledTemplate(name, entry).then(found => {
            if(found){
              onload(entry);
            }else{
              address = req.toUrl(name);

              that.importTemplate(address).then(template => {
                entry.setTemplate(template);
                onload(entry);
              });
            }
          });
        }
      });
    }else{
      System.set('view', System.newModule({
        'fetch': function(load, fetch) {
          var id = load.name.substring(0, load.name.indexOf('!'));
          var entry = load.metadata.templateRegistryEntry = that.getOrCreateTemplateRegistryEntry(id);

          if(entry.templateIsLoaded){
            return '';
          }

          return that.findBundledTemplate(load.name, entry).then(found => {
            if(found){
              return '';
            }

            return that.importTemplate(load.address).then(template => {
              entry.setTemplate(template);
              return '';
            });
          });
        },
        'instantiate':function(load) {
          return load.metadata.templateRegistryEntry;
        }
      }));
    }
  }

  loadModule(id){
    return System.normalize(id).then(newId => {
      var existing = this.moduleRegistry[newId];
      if(existing){
        return existing;
      }

      return System.import(newId).then(m => {
        this.moduleRegistry[newId] = m;
        return ensureOriginOnExports(m, newId);
      });
    });
  }

  loadAllModules(ids){
    var loads = [];

    for(var i = 0, ii = ids.length; i < ii; ++i){
      loads.push(this.loadModule(ids[i]));
    }

    return Promise.all(loads);
  }

  loadTemplate(url){
    return polyfilled ? System.import('view!' + url) : System.import(url + '!view');
  }

  loadText(url){
    return polyfilled ? System.import('text!' + url) : System.import(url + '!text');
  }
}

window.AureliaLoader = DefaultLoader;
