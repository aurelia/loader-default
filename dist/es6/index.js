import {Origin} from 'aurelia-metadata';
import {Loader} from 'aurelia-loader';
import {join} from 'aurelia-path';

if(!window.System || !window.System.import){
  var sys = window.System = window.System || {};
  sys.polyfilled = true;
  sys.map = {};
  sys['import'] = function(moduleId){
    return new Promise((resolve, reject) => {
      require([moduleId], resolve, reject);
    });
  };
  sys.normalize = function(url){
    return Promise.resolve(url);
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

Loader.createDefaultLoader = function(){
  return new DefaultLoader();
};

export class DefaultLoader extends Loader {
  constructor(){
    this.baseUrl = System.baseUrl;
    this.baseViewUrl = System.baseViewUrl || System.baseUrl;
    this.registry = {};
  }

  loadModule(id, baseUrl){
    baseUrl = baseUrl === undefined ? this.baseUrl : baseUrl;

    if(baseUrl && id.indexOf(baseUrl) !== 0){
      id = join(baseUrl, id);
    }
    
    return System.normalize(id).then(newId => {
      var existing = this.registry[newId];
      if(existing){
        return existing;
      }

      return System.import(newId).then(m => {
        this.registry[newId] = m;
        return ensureOriginOnExports(m, newId);
      });
    });
  }

  loadAllModules(ids){
    var loads = [];

    for(let id of ids){
      loads.push(this.loadModule(id));
    }

    return Promise.all(loads);
  }

  loadTemplate(url){
    if(this.baseViewUrl && url.indexOf(this.baseViewUrl) !== 0){
      url = join(this.baseViewUrl, url);
    }

    return this.importTemplate(url);
  }
}
