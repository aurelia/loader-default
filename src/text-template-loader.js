import {TemplateRegistryEntry, Loader} from 'aurelia-loader';

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

    if (!this.hasTemplateElement) {
      template.content = document.createDocumentFragment();

      while (template.firstChild) {
        template.content.appendChild(template.firstChild);
      }

      HTMLTemplateElement.bootstrap(template);
    }

    return template;
  }
}
