import {TemplateRegistryEntry,Loader} from 'aurelia-loader';
import {Origin} from 'aurelia-metadata';

export class TextTemplateLoader {
  constructor() {
    this.hasTemplateElement = ('content' in document.createElement('template'));
  }

  loadTemplate(loader: Loader, entry: TemplateRegistryEntry): Promise<any> {
    return loader.loadText(entry.address).then(text => {
      entry.setTemplate(this._createTemplateFromMarkup(text));
    });
  }

  _createTemplateFromMarkup(markup) {
    let parser = document.createElement('div');
    parser.innerHTML = markup;

    let template = parser.firstElementChild;

    if (this.hasTemplateElement) {
      return template;
    }

    template.content = document.createDocumentFragment();

    while (template.firstChild) {
      template.content.appendChild(template.firstChild);
    }

    HTMLTemplateElement.bootstrap(template);
    return template;
  }
}

/*eslint dot-notation:0*/
let polyfilled = false;

if (!window.System || !window.System.import) {
  let sys = window.System = window.System || {};

  sys.polyfilled = polyfilled = true;
  sys.isFake = false;
  sys.map = {};

  sys['import'] = function(moduleId) {
    return new Promise((resolve, reject) => {
      require([moduleId], resolve, reject);
    });
  };

  sys.normalize = function(url) {
    return Promise.resolve(url);
  };

  sys.normalizeSync = function(url) {
    return url;
  };

  if (window.requirejs && requirejs.s && requirejs.s.contexts && requirejs.s.contexts._ && requirejs.s.contexts._.defined) {
    let defined = requirejs.s.contexts._.defined;
    sys.forEachModule = function(callback) {
      for (let key in defined) {
        if (callback(key, defined[key])) return;
      }
    };
  } else {
    sys.forEachModule = function(callback) {};
  }
} else {
  let modules = System._loader.modules;

  System.isFake = false;

  System.forEachModule = function(callback) {
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
}

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

  loadModule(id: string): Promise<any> {
    return System.normalize(id).then(newId => {
      let existing = this.moduleRegistry[newId];
      if (existing) {
        return existing;
      }

      return System.import(newId).then(m => {
        this.moduleRegistry[newId] = m;
        return ensureOriginOnExports(m, newId);
      });
    });
  }

  loadAllModules(ids: string[]): Promise<any[]> {
    let loads = [];

    for (let i = 0, ii = ids.length; i < ii; ++i) {
      loads.push(this.loadModule(ids[i]));
    }

    return Promise.all(loads);
  }

  loadTemplate(url: string): Promise<TemplateRegistryEntry> {
    return System.import(this.applyPluginToUrl(url, 'template-registry-entry'));
  }

  loadText(url: string): Promise<string> {
    return System.import(this.applyPluginToUrl(url, this.textPluginName));
  }

  applyPluginToUrl(url: string, pluginName: string): string {
    return polyfilled ? `${pluginName}!${url}` : `${url}!${pluginName}`;
  }

  addPlugin(pluginName, implementation) {
    if (polyfilled) {
      define(pluginName, [], {
        'load': function(name, req, onload) {
          let address = req.toUrl(name);
          let result = implementation.fetch(address);
          Promise.resolve(result).then(onload);
        }
      });
    } else {
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
