import {Origin} from 'aurelia-metadata';
import {Loader} from 'aurelia-loader';

//works for amd, commonjs and globals
//instantiate returns undefined for es6 today; devs must use annotation: @Origin(__moduleName)
//Let's try to get the ES6 Module Loader spec fixed so that it's consistent!

var originalInstantiate = System.instantiate.bind(System);

System.instantiate = function (load) {
  return originalInstantiate(load).then(function (m) {
    var execute = m.execute;

    m.execute = function () {
      var executed = execute.apply(m, arguments), key, exportedValue;
      var target = executed;

      if(target.__useDefault){
        target = target['default'];
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

Loader.createDefaultLoader = function(){
  return new SystemJSLoader();
};

export class SystemJSLoader extends Loader {
  loadModule(id){ 
    id = System.baseUrl + '/' + id;
    return System.import(id);
  }

  loadAllModules(ids){ 
    var loads = [], i, ii, loader = this.loader;

    for(i = 0, ii = ids.length; i < ii; ++i){
      loads.push(this.loadModule(ids[i]));
    }

    return Promise.all(loads);
  }

  getBaseUrl(){
    return System.baseUrl;
  }
}