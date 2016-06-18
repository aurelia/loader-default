import { TemplateRegistryEntry, Loader } from 'aurelia-loader';
import { DOM, PLATFORM } from 'aurelia-pal';
import { Origin } from 'aurelia-metadata';

export let TextTemplateLoader = class TextTemplateLoader {
  loadTemplate(loader, entry) {
    return loader.loadText(entry.address).then(text => {
      entry.template = DOM.createTemplateFromMarkup(text);
    });
  }
};

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

export let DefaultLoader = class DefaultLoader extends Loader {
  constructor() {
    super();

    this.textPluginName = 'text';
    this.moduleRegistry = Object.create(null);
    this.useTemplateLoader(new TextTemplateLoader());

    let that = this;

    this.addPlugin('template-registry-entry', {
      'fetch': function (address) {
        let entry = that.getOrCreateTemplateRegistryEntry(address);
        return entry.templateIsLoaded ? entry : that.templateLoader.loadTemplate(that, entry).then(x => entry);
      }
    });
  }

  useTemplateLoader(templateLoader) {
    this.templateLoader = templateLoader;
  }

  loadAllModules(ids) {
    let loads = [];

    for (let i = 0, ii = ids.length; i < ii; ++i) {
      loads.push(this.loadModule(ids[i]));
    }

    return Promise.all(loads);
  }

  loadTemplate(url) {
    return this._import(this.applyPluginToUrl(url, 'template-registry-entry'));
  }

  loadText(url) {
    return this._import(this.applyPluginToUrl(url, this.textPluginName)).then(textOrModule => {
      if (typeof textOrModule === 'string') {
        return textOrModule;
      }

      return textOrModule['default'];
    });
  }
};

PLATFORM.Loader = DefaultLoader;

if (!PLATFORM.global.System || !PLATFORM.global.System.import) {
  if (PLATFORM.global.requirejs && requirejs.s && requirejs.s.contexts && requirejs.s.contexts._ && requirejs.s.contexts._.defined) {
    PLATFORM.eachModule = function (callback) {
      let defined = requirejs.s.contexts._.defined;
      for (let key in defined) {
        try {
          if (callback(key, defined[key])) return;
        } catch (e) {}
      }
    };
  } else {
    PLATFORM.eachModule = function (callback) {};
  }

  DefaultLoader.prototype._import = function (moduleId) {
    return new Promise((resolve, reject) => {
      require([moduleId], resolve, reject);
    });
  };

  DefaultLoader.prototype.loadModule = function (id) {
    let existing = this.moduleRegistry[id];
    if (existing !== undefined) {
      return Promise.resolve(existing);
    }

    return new Promise((resolve, reject) => {
      require([id], m => {
        this.moduleRegistry[id] = m;
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
    return `${ pluginName }!${ url }`;
  };

  DefaultLoader.prototype.addPlugin = function (pluginName, implementation) {
    let nonAnonDefine = define;
    nonAnonDefine(pluginName, [], {
      'load': function (name, req, onload) {
        let result = implementation.fetch(name);
        Promise.resolve(result).then(onload);
      }
    });
  };
} else {
  PLATFORM.eachModule = function (callback) {
    let modules = System._loader.modules;

    for (let key in modules) {
      try {
        if (callback(key, modules[key].module)) return;
      } catch (e) {}
    }
  };

  System.set('text', System.newModule({
    'translate': function (load) {
      return 'module.exports = "' + load.source.replace(/(["\\])/g, '\\$1').replace(/[\f]/g, '\\f').replace(/[\b]/g, '\\b').replace(/[\n]/g, '\\n').replace(/[\t]/g, '\\t').replace(/[\r]/g, '\\r').replace(/[\u2028]/g, '\\u2028').replace(/[\u2029]/g, '\\u2029') + '";';
    }
  }));

  DefaultLoader.prototype._import = function (moduleId) {
    return System.import(moduleId);
  };

  DefaultLoader.prototype.loadModule = function (id) {
    return System.normalize(id).then(newId => {
      let existing = this.moduleRegistry[newId];
      if (existing !== undefined) {
        return Promise.resolve(existing);
      }

      return System.import(newId).then(m => {
        this.moduleRegistry[newId] = m;
        return ensureOriginOnExports(m, newId);
      });
    });
  };

  DefaultLoader.prototype.map = function (id, source) {
    System.map[id] = source;
  };

  DefaultLoader.prototype.normalizeSync = function (moduleId, relativeTo) {
    return System.normalizeSync(moduleId, relativeTo);
  };

  DefaultLoader.prototype.normalize = function (moduleId, relativeTo) {
    return System.normalize(moduleId, relativeTo);
  };

  DefaultLoader.prototype.applyPluginToUrl = function (url, pluginName) {
    return `${ url }!${ pluginName }`;
  };

  DefaultLoader.prototype.addPlugin = function (pluginName, implementation) {
    System.set(pluginName, System.newModule({
      'fetch': function (load, _fetch) {
        let result = implementation.fetch(load.address);
        return Promise.resolve(result).then(x => {
          load.metadata.result = x;
          return '';
        });
      },
      'instantiate': function (load) {
        return load.metadata.result;
      }
    }));
  };
}