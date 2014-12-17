System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js"
  }
});

System.config({
  "map": {
    "aurelia-loader": "github:aurelia/loader@0.2.0",
    "aurelia-metadata": "github:aurelia/metadata@0.1.1",
    "github:aurelia/loader@0.2.0": {
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.1.1",
      "es6-shim": "github:paulmillr/es6-shim@0.21.1",
      "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.5.2"
    }
  }
});

