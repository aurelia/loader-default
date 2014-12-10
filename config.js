System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js"
  }
});

System.config({
  "map": {
    "aurelia-loader": "github:aurelia/loader@0.0.2",
    "aurelia-metadata": "github:aurelia/metadata@0.0.5",
    "github:aurelia/loader@0.0.2": {
      "aurelia-path": "github:aurelia/path@0.0.1"
    }
  }
});

