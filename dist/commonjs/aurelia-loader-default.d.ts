declare module 'aurelia-loader-default' {
  import { TemplateRegistryEntry, Loader }  from 'aurelia-loader';
  import { DOM, PLATFORM }  from 'aurelia-pal';
  import { Origin }  from 'aurelia-metadata';
  export interface TemplateLoader {
    loadTemplate(loader: Loader, entry: TemplateRegistryEntry): Promise<any>;
  }
  export class TextTemplateLoader {
    loadTemplate(loader: Loader, entry: TemplateRegistryEntry): Promise<any>;
  }
  export class DefaultLoader extends Loader {
    textPluginName: string;
    constructor();
    useTemplateLoader(templateLoader: TemplateLoader): void;
    loadAllModules(ids: string[]): Promise<any[]>;
    loadTemplate(url: string): Promise<TemplateRegistryEntry>;
    loadText(url: string): Promise<string>;
  }
}