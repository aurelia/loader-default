import {Origin,normalize} from 'aurelia-metadata';
import {Loader} from 'aurelia-loader';

//works for amd, commonjs and globals
//instantiate returns undefined for es6 today; devs must use annotation: @Origin(__moduleName)

var originalInstantiate = System.instantiate.bind(System);

System.instantiate = function(load) {
  return originalInstantiate(load).then(function(m) {
    var execute = m.execute;

    m.execute = function() {
      var executed = execute.apply(m, arguments),
          key, exportedValue;
      
      for(key in executed){
        exportedValue = executed[key];

        if(typeof exportedValue === 'function'){
          normalize(exportedValue);
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
    return System.import(id);
  }

  loadAllModules(ids){ 
    var loads = [], i, ii, loader = this.loader;

    for(i = 0, ii = ids.length; i < ii; ++i){
      loads.push(System.import(ids[i]));
    }

    return Promise.all(loads);
  }

  getBaseUrl(){
    return System.baseUrl;
  }
}