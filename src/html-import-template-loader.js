import {TemplateRegistryEntry} from 'aurelia-loader';

export class HTMLImportTemplateLoader {
  constructor(loader){
    this.loader = loader;
    this.hasTemplateElement = ('content' in document.createElement('template'));
    this.needsBundleCheck = true;
  }

  loadTemplate(address: string, canonicalName: string, entry: TemplateRegistryEntry): Promise<TemplateRegistryEntry> {
    return this._tryFindTemplateInBundle(address, canonicalName, entry).then(found => {
      if(found){
        return entry;
      }

      return this._importDocument(address).then(doc => {
        let template = this._findTemplate(doc, address);
        entry.setTemplate(template);
        return entry;
      });
    });
  }

  _tryFindTemplateInBundle(address: string, canonicalName: string, entry: TemplateRegistryEntry): Promise<boolean>{
    if(this.bundle){
      return this._tryGetTemplateFromBundle(canonicalName, entry);
    } else if(this.onBundleReady){
      return this.onBundleReady.then(() => this._tryGetTemplateFromBundle(canonicalName, entry));
    } else if(this.needsBundleCheck){
      if(!('import' in document.createElement('link'))){
        return System.normalize('aurelia-loader-default').then(name => {
          return System.import('webcomponentsjs/HTMLImports.min', name).then(() => {
            return this._loadBundle();
          });
        });
      }else{
        return this._loadBundle();
      }
    }

    return Promise.resolve(false);
  }

  _loadBundle(){
    var bundleLink = document.querySelector('link[aurelia-view-bundle]');
    this.needsBundleCheck = false;

    if(bundleLink){
      this.onBundleReady = this._importBundle(bundleLink).then(doc => {
        this.bundle = doc;
        this.onBundleReady = null;
      });

      return this.onBundleReady.then(() => this._tryGetTemplateFromBundle(canonicalName, entry));
    }
  }

  _importDocument(url) {
    return new Promise((resolve, reject) => {
      var frag = document.createDocumentFragment();
      var link = document.createElement('link');

      link.rel = 'import';
      link.href = url;
      frag.appendChild(link);

      this._importElements(frag, link, () => resolve(link.import));
    });
  }

  _findTemplate(doc, url) {
    if(!this.hasTemplateElement){
      HTMLTemplateElement.bootstrap(doc);
    }

    var template = doc.getElementsByTagName('template')[0];

    if(!template){
      throw new Error(`There was no template element found in '${url}'.`);
    }

    return template;
  }

  _tryGetTemplateFromBundle(name, entry){
    var found = this.bundle.getElementById(name);

    if(found){
      entry.setTemplate(found);
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }

  _importBundle(link) {
    return new Promise((resolve, reject) => {
      if(link.import){
        if(!this.hasTemplateElement){
          HTMLTemplateElement.bootstrap(link.import);
        }

        resolve(link.import);
      }else{
        this._importElements(null, link, () => {
          if(!this.hasTemplateElement){
            HTMLTemplateElement.bootstrap(link.import);
          }

          resolve(link.import);
        });
      }
    });
  }

  _importElements(frag, link, callback) {
    if(frag){
      document.head.appendChild(frag);
    }

    if(window.Polymer && Polymer.whenReady){
      Polymer.whenReady(callback);
    }else{
      link.addEventListener('load', callback);
    }
  }
}
