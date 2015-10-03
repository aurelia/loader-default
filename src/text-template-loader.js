import {TemplateRegistryEntry, Loader} from 'aurelia-loader';
import {DOM} from 'aurelia-pal';

export class TextTemplateLoader {
  loadTemplate(loader: Loader, entry: TemplateRegistryEntry): Promise<any> {
    return loader.loadText(entry.address).then(text => {
      entry.setTemplate(DOM.createTemplateFromMarkup(text));
    });
  }
}
