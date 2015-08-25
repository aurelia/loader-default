import {TemplateRegistryEntry} from 'aurelia-loader';

export class TextTemplateLoader {
  constructor(loader){
    this.loader = loader;
    this.hasTemplateElement = ('content' in document.createElement('template'));
  }

  loadTemplate(address: string, canonicalName: string, entry: TemplateRegistryEntry): Promise<TemplateRegistryEntry> {
    return this.loader.loadText(address).then(text => {
      let template = this._createTemplateFromMarkup(text);
      entry.setTemplate(template);
      return entry;
    });
  }

  _createTemplateFromMarkup(markup) {
    let parser = document.createElement('div');
    parser.innerHTML = markup;

    let template = parser.firstElementChild;

    if(this._needsTemplateFixup){
      template.content = document.createDocumentFragment();
      while(template.firstChild){
        template.content.appendChild(template.firstChild);
      }
    }

    if(!this.hasTemplateElement){
      HTMLTemplateElement.bootstrap(template);
    }

    return template;
  }
}
