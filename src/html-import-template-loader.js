import {TemplateRegistryEntry, Loader} from 'aurelia-loader';

export class HTMLImportTemplateLoader {
  constructor() {
    this.hasTemplateElement = ('content' in document.createElement('template'));
    this.needsBundleCheck = true;
    this.onBundleReady = null;
  }

  loadTemplate(loader: Loader, entry: TemplateRegistryEntry): Promise<any> {
    return this._tryFindTemplateInBundle(entry).then(found => {
      return found ? entry : this._importDocument(entry).then(doc => this._findTemplate(doc, entry));
    });
  }

  _tryFindTemplateInBundle(entry: TemplateRegistryEntry): Promise<boolean> {
    if (this.bundle) {
      return this._tryGetTemplateFromBundle(entry);
    } else if (this.onBundleReady) {
      return this.onBundleReady.then(() => this._tryGetTemplateFromBundle(entry));
    } else if (this.needsBundleCheck) {
      if (!('import' in document.createElement('link'))) {
        return System.normalize('aurelia-loader-default').then(name => {
          return System.import('webcomponentsjs/HTMLImports.min', name).then(() => {
            return this._loadBundle(entry);
          });
        });
      }

      return this._loadBundle(entry);
    }

    return Promise.resolve(false);
  }

  _loadBundle(entry) {
    let bundleLink = document.querySelector('link[aurelia-view-bundle]');
    this.needsBundleCheck = false;

    if (bundleLink) {
      this.onBundleReady = this._importBundle(bundleLink).then(doc => {
        this._normalizeTemplateIds(doc);
        this.bundle = doc;
        this.onBundleReady = null;
      });

      return this.onBundleReady.then(() => this._tryGetTemplateFromBundle(entry));
    }

    return Promise.resolve(false);
  }

  _importDocument(entry) {
    return new Promise((resolve, reject) => {
      let frag = document.createDocumentFragment();
      let link = document.createElement('link');

      link.rel = 'import';
      link.href = entry.address;
      frag.appendChild(link);

      this._importElements(frag, link, () => resolve(link.import));
    });
  }

  _findTemplate(doc, entry) {
    if (!this.hasTemplateElement) {
      HTMLTemplateElement.bootstrap(doc);
    }

    let template = doc.getElementsByTagName('template')[0];

    if (!template) {
      throw new Error(`There was no template element found in '${entry.address}'.`);
    }

    entry.setTemplate(template);
  }

  _tryGetTemplateFromBundle(entry) {
    let found = this.bundle.getElementById(entry.address);

    if (found) {
      entry.setTemplate(found);
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }

  _importBundle(link) {
    return new Promise((resolve, reject) => {
      if (link.import) {
        if (!this.hasTemplateElement) {
          HTMLTemplateElement.bootstrap(link.import);
        }

        resolve(link.import);
      } else {
        this._importElements(null, link, () => {
          if (!this.hasTemplateElement) {
            HTMLTemplateElement.bootstrap(link.import);
          }

          resolve(link.import);
        });
      }
    });
  }

  _normalizeTemplateIds(doc) {
    let templates = doc.getElementsByTagName('template');

    for (let i = 0, ii = templates.length; i < ii; ++i) {
      let current = templates[i];
      current.setAttribute('id', System.normalizeSync(current.getAttribute('id')));
    }
  }

  _importElements(frag, link, callback) {
    if (frag) {
      document.head.appendChild(frag);
    }

    if (window.Polymer && Polymer.whenReady ) {
      Polymer.whenReady(callback);
    } else {
      link.addEventListener('load', callback);
    }
  }
}
