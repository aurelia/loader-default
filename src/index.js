import {Origin} from 'aurelia-metadata';
import {Loader, TemplateRegistryEntry} from 'aurelia-loader';

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

function getCanonicalName(loader, normalized) {
  // remove the plugin part first
  var pluginIndex = normalized.indexOf('!');
  var plugin;
  if (pluginIndex != -1) {
    plugin = normalized.substr(pluginIndex + 1);
    normalized = normalized.substr(0, pluginIndex);
  }

  // defaultJSExtensions handling
  if (loader.defaultJSExtensions && normalized.split('/').pop().split('.').pop() == 'js') {
    // if we're in a package that disables defaultJSExtensions, leave as-is
    var isDefaultExtensionPackage = false;
    for (var p in loader.packages) {
      if (normalized.substr(0, p.length) == p && (normalized.length == p.length || normalized[p.length] == '/')) {
        if ('defaultExtension' in loader.packages[p])
          isDefaultExtensionPackage = true;
      }
    }

    // remove defaultJSExtension
    if (!isDefaultExtensionPackage)
      normalized = normalized.substr(0, normalized.length - 3);
  }

  // now just reverse apply paths rules to get canonical name
  var pathMatch, pathMatchLength = 0;
  var curMatchLength;
  for (var p in loader.paths) {
    // normalize the output path
    var curPath = new url(loader.paths[p], loader.baseURL).href;

    // do reverse match
    var wIndex = curPath.indexOf('*');
    if (wIndex === -1) {
      if (normalized === curPath) {
        curMatchLength = curPath.split('/').length;
        if (curMatchLength > pathMatchLength) {
          pathMatch = p;
          pathMatchLength = curMatchLength;
        }
      }
    }
    else {
      if (normalized.substr(0, wIndex) === curPath.substr(0, wIndex)
        && normalized.substr(normalized.length - curPath.length + wIndex + 1) === curPath.substr(wIndex + 1)) {
        curMatchLength = curPath.split('/').length;
        if (curMatchLength > pathMatchLength) {
          pathMatch = p.replace('*', normalized.substr(wIndex, normalized.length - curPath.length + 1));
          pathMatchLength = curMatchLength;
        }
      }
    }
  }

  // when no path was matched, act like the standard rule is *: baseURL/*
  if (!pathMatch) {
    if (normalized.substr(0, loader.baseURL.length) == loader.baseURL)
      pathMatch = normalized.substr(loader.baseURL.length);
    else
      pathMatch = normalized;
  }

  if (plugin)
    pathMatch += '!' + getCanonicalName(loader, plugin);

  return pathMatch;
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
        'fetch': function(load, _fetch) {
          let name = getCanonicalName(this, load.name);
          let id = name.substring(0, name.indexOf('!'));
          let entry = load.metadata.templateRegistryEntry = that.getOrCreateTemplateRegistryEntry(id);

          if(entry.templateIsLoaded) {
            return '';
          }

          return that.findBundledTemplate(name, entry).then(found => {
            if(found) {
              return '';
            }

            return that.importTemplate(load.address).then(template => {
              entry.setTemplate(template);
              return '';
            });
          });
        },
        'instantiate': function(load) {
          return load.metadata.templateRegistryEntry;
        }
      }));
    }
  }

  loadModule(id: string): Proimise<any> {
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

  loadAllModules(ids: string[]): Promse<any[]> {
    var loads = [];

    for(var i = 0, ii = ids.length; i < ii; ++i){
      loads.push(this.loadModule(ids[i]));
    }

    return Promise.all(loads);
  }

  loadTemplate(url: string): Promise<TemplateRegistryEntry> {
    return polyfilled ? System.import('view!' + url) : System.import(url + '!view');
  }

  loadText(url: string): Promise<string> {
    return polyfilled ? System.import('text!' + url) : System.import(url + '!text');
  }
}

window.AureliaLoader = DefaultLoader;
