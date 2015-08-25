import {Origin} from 'aurelia-metadata';
import {Loader} from 'aurelia-loader';
import {HTMLImportTemplateLoader} from './html-import-template-loader';
import {TextTemplateLoader} from './text-template-loader';

let polyfilled = false;
let url = null;

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

  sys.normalizeSync = function(url){
    return url;
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
  var modules = System._loader.modules, hasURL = false;

  try {
    hasURL = new URL('test:///').protocol == 'test:';
  }
  catch(e) {}

  url = hasURL ? URL : URLPolyfill;

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

interface TemplateLoader {
  loadTemplate(loader: Loader, entry: TemplateRegistryEntry): Promise<any>;
}

export class DefaultLoader extends Loader {
  constructor(){
    super();

    this.moduleRegistry = {};
    this.useHTMLImportsLoader();

    let that = this;

    this.addPlugin('template-registry-entry', {
      'fetch':function(address) {
        let entry = that.getOrCreateTemplateRegistryEntry(address);
        return entry.templateIsLoaded ? entry : that.templateLoader.loadTemplate(that, entry).then(x => entry);
      }
    });
  }

  useTemplateLoader(templateLoader: TemplateLoader): void {
    this.templateLoader = templateLoader;
  }

  useTextLoader(): void {
    console.warn('The useTextLoader() API will be removed once this option becomes the default.');
    this.useTemplateLoader(new TextTemplateLoader());
  }

  useHTMLImportsLoader(): void {
    this.useTemplateLoader(new HTMLImportTemplateLoader());
  }

  loadModule(id: string): Promise<any> {
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

  loadAllModules(ids: string[]): Promise<any[]> {
    var loads = [];

    for(var i = 0, ii = ids.length; i < ii; ++i){
      loads.push(this.loadModule(ids[i]));
    }

    return Promise.all(loads);
  }

  loadTemplate(url: string): Promise<TemplateRegistryEntry> {
    return System.import(this.applyPluginToUrl(url, 'template-registry-entry'));
  }

  loadText(url: string): Promise<string> {
    return System.import(this.applyPluginToUrl(url, 'text'));
  }

  applyPluginToUrl(url: string, pluginName: string): string {
    return polyfilled ? `${pluginName}!${url}` : `${url}!${pluginName}`;
  }

  addPlugin(pluginName, implementation){
    if(polyfilled){
      define(pluginName, [], {
        'load': function (name, req, onload) {
          let address = req.toUrl(name);
          let result = implementation.fetch(address);
          Promise.resolve(result).then(onload);
        }
      });
    }else{
      System.set(pluginName, System.newModule({
        'fetch': function(load, _fetch) {
          let result = implementation.fetch(load.address);
          return Promise.resolve(result).then(x => {
            load.metadata.result = x;
            return '';
          });
        },
        'instantiate': function(load) {
          return load.metadata.result;
        }
      }));
    }
  }
}

window.AureliaLoader = DefaultLoader;
