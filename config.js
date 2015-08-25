System.config({
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime",
      "es7.decorators"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "aurelia-loader-default/*": "dist/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "aurelia-loader": "github:aurelia/loader@0.8.4",
    "aurelia-metadata": "github:aurelia/metadata@0.7.3",
    "babel": "npm:babel-core@5.1.13",
    "babel-runtime": "npm:babel-runtime@5.1.13",
    "core-js": "npm:core-js@0.9.18",
    "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.7.12",
    "github:aurelia/loader@0.8.4": {
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.2.0",
      "aurelia-metadata": "github:aurelia/metadata@0.7.3",
      "aurelia-path": "github:aurelia/path@0.8.1",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/metadata@0.7.3": {
      "core-js": "npm:core-js@0.9.18"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:core-js@0.9.18": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    }
  }
});

