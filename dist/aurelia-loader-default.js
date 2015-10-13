import {TemplateRegistryEntry,Loader} from 'aurelia-loader';
import {DOM,PLATFORM} from 'aurelia-pal';
import {Origin} from 'aurelia-metadata';

export class TextTemplateLoader {
  loadTemplate(loader: Loader, entry: TemplateRegistryEntry): Promise<any> {
    return loader.loadText(entry.address).then(text => {
      entry.setTemplate(DOM.createTemplateFromMarkup(text));
    });
  }
}

/*eslint dot-notation:0*/
function ensureOriginOnExports(executed, name) {
  let target = executed;
  let key;
  let exportedValue;

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

interface TemplateLoader {
  loadTemplate(loader: Loader, entry: TemplateRegistryEntry): Promise<any>;
}

export class DefaultLoader extends Loader {
  textPluginName: string = 'text';

  constructor() {
    super();

    this.moduleRegistry = {};
    this.useTemplateLoader(new TextTemplateLoader());

    let that = this;

    this.addPlugin('template-registry-entry', {
      'fetch': function(address) {
        let entry = that.getOrCreateTemplateRegistryEntry(address);
        return entry.templateIsLoaded ? entry : that.templateLoader.loadTemplate(that, entry).then(x => entry);
      }
    });
  }

  useTemplateLoader(templateLoader: TemplateLoader): void {
    this.templateLoader = templateLoader;
  }

  loadAllModules(ids: string[]): Promise<any[]> {
    let loads = [];

    for (let i = 0, ii = ids.length; i < ii; ++i) {
      loads.push(this.loadModule(ids[i]));
    }

    return Promise.all(loads);
  }

  loadTemplate(url: string): Promise<TemplateRegistryEntry> {
    return this._import(this.applyPluginToUrl(url, 'template-registry-entry'));
  }

  loadText(url: string): Promise<string> {
    return this._import(this.applyPluginToUrl(url, this.textPluginName));
  }
}

PLATFORM.Loader = DefaultLoader;

if (!PLATFORM.global.System || !PLATFORM.global.System.import) {
  if (PLATFORM.global.requirejs && requirejs.s && requirejs.s.contexts && requirejs.s.contexts._ && requirejs.s.contexts._.defined) {
    let defined = requirejs.s.contexts._.defined;
    PLATFORM.eachModule = function(callback) {
      for (let key in defined) {
        if (callback(key, defined[key])) return;
      }
    };
  } else {
    PLATFORM.eachModule = function(callback) {};
  }

  DefaultLoader.prototype._import = function(moduleId) {
    return new Promise((resolve, reject) => {
      require([moduleId], resolve, reject);
    });
  };

  DefaultLoader.prototype.loadModule = function(id) {
    let existing = this.moduleRegistry[id];
    if (existing) {
      return Promise.resolve(existing);
    }

    return new Promise((resolve, reject) => {
      require([id], m => {
        this.moduleRegistry[id] = m;
        resolve(ensureOriginOnExports(m, id));
      }, reject);
    });
  };

  DefaultLoader.prototype.map = function(id, source) {};

  DefaultLoader.prototype.normalizeSync = function(moduleId, relativeTo) {
    return moduleId;
  };

  DefaultLoader.prototype.applyPluginToUrl = function(url, pluginName) {
    return `${pluginName}!${url}`;
  };

  DefaultLoader.prototype.addPlugin = function(pluginName, implementation) {
    define(pluginName, [], {
      'load': function(name, req, onload) {
        let address = req.toUrl(name);
        let result = implementation.fetch(address);
        Promise.resolve(result).then(onload);
      }
    });
  };
} else {
  let modules = System._loader.modules;

  PLATFORM.eachModule = function(callback) {
    for (let key in modules) {
      if (callback(key, modules[key].module)) return;
    }
  };

  System.set('text', System.newModule({
    'translate': function(load) {
      return 'module.exports = "' + load.source
        .replace(/(["\\])/g, '\\$1')
        .replace(/[\f]/g, '\\f')
        .replace(/[\b]/g, '\\b')
        .replace(/[\n]/g, '\\n')
        .replace(/[\t]/g, '\\t')
        .replace(/[\r]/g, '\\r')
        .replace(/[\u2028]/g, '\\u2028')
        .replace(/[\u2029]/g, '\\u2029')
      + '";';
    }
  }));

  DefaultLoader.prototype._import = function(moduleId) {
    return System.import(moduleId);
  };

  DefaultLoader.prototype.loadModule = function(id) {
    let newId = System.normalizeSync(id);
    let existing = this.moduleRegistry[newId];

    if (existing) {
      return Promise.resolve(existing);
    }

    return System.import(newId).then(m => {
      this.moduleRegistry[newId] = m;
      return ensureOriginOnExports(m, newId);
    });
  };

  DefaultLoader.prototype.map = function(id, source) {
    System.map[id] = source;
  };

  DefaultLoader.prototype.normalizeSync = function(moduleId, relativeTo) {
    return System.normalizeSync(moduleId, relativeTo);
  };

  DefaultLoader.prototype.applyPluginToUrl = function(url, pluginName) {
    return `${url}!${pluginName}`;
  };

  DefaultLoader.prototype.addPlugin = function(pluginName, implementation) {
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
  };
}
