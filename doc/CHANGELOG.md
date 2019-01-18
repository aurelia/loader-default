<a name="1.2.0"></a>
# [1.2.0](https://github.com/aurelia/loader-default/compare/1.1.0...1.2.0) (2019-01-18)


### Bug Fixes

* do not reject unsupported AMD loader ([846befe](https://github.com/aurelia/loader-default/commit/846befe))


### Features

* add support of dumber-module-loader ([1d9433f](https://github.com/aurelia/loader-default/commit/1d9433f))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/aurelia/loader-default/compare/1.0.4...1.1.0) (2018-12-01)


### Bug Fixes

* remove unnecessary inline SystemJS text plugin ([8c9a183](https://github.com/aurelia/loader-default/commit/8c9a183)), closes [aurelia/i18n#289](https://github.com/aurelia/i18n/issues/289)


### Features

* **loader:** Added support for alameda amd loader ([9b4bb40](https://github.com/aurelia/loader-default/commit/9b4bb40))



<a name="1.0.4"></a>
## [1.0.4](https://github.com/aurelia/loader-default/compare/1.0.3...1.0.4) (2018-03-29)


### Bug Fixes

* fix commonjs build error in requirejs env ([04f6d60](https://github.com/aurelia/loader-default/commit/04f6d60)), closes [#47](https://github.com/aurelia/loader-default/issues/47)
* improve compatibility with other AMD implementations. ([0f8b5e8](https://github.com/aurelia/loader-default/commit/0f8b5e8)), closes [#48](https://github.com/aurelia/loader-default/issues/48)



<a name="1.0.3"></a>
## [1.0.3](https://github.com/aurelia/loader-default/compare/1.0.2...v1.0.3) (2017-10-01)


### Bug Fixes

* **index:** use .keys instead of .entries close [#43](https://github.com/aurelia/loader-default/issues/43) ([49948a1](https://github.com/aurelia/loader-default/commit/49948a1)), closes [#43](https://github.com/aurelia/loader-default/issues/43)


### Performance Improvements

* **index:** single array index for system key ([f5e36b1](https://github.com/aurelia/loader-default/commit/f5e36b1))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/aurelia/loader-default/compare/1.0.1...v1.0.2) (2017-03-23)


### Bug Fixes

* **index:** fix PLATFORM.eachModule for SystemJS[@0](https://github.com/0).20.x ([7c2c925](https://github.com/aurelia/loader-default/commit/7c2c925))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/aurelia/loader-default/compare/1.0.0...v1.0.1) (2017-02-21)


### Bug Fixes

* **DefaultLoader:** use config API for map ([a4607b9](https://github.com/aurelia/loader-default/commit/a4607b9))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/aurelia/loader-default/compare/1.0.0-rc.1.0.0...v1.0.0) (2016-07-27)



<a name="1.0.0-rc.1.0.0"></a>
# [1.0.0-rc.1.0.0](https://github.com/aurelia/loader-default/compare/1.0.0-beta.2.0.2...v1.0.0-rc.1.0.0) (2016-06-22)



### 1.0.0-beta.1.2.2 (2016-05-10)


### 1.0.0-beta.1.2.1 (2016-04-13)


#### Bug Fixes

* **index:** ensure correct cache lookup ([b32ff61a](http://github.com/aurelia/loader-default/commit/b32ff61a5fc00eb995bb008d7c1f83fdffa71d7d))


### 1.0.0-beta.1.2.0(2016-03-22)

#### Bug Fixes

* **DefaultLoader:** do not map name to address in requirejs mode ([30016b6e](http://github.com/aurelia/loader-default/commit/30016b6ef904228a582863e83b49e8f3c0556e63))

### 1.0.0-beta.1.1.3 (2016-02-25)


#### Bug Fixes

* **loader:** alias the loader ([70b7cb83](http://github.com/aurelia/loader-default/commit/70b7cb83a5f78131cdb66bc29398c24fd243b2b1))


### 1.0.0-beta.1.1.2 (2016-02-08)


#### Bug Fixes

* **index:** properly normalize for systemjs ([aa3c4813](http://github.com/aurelia/loader-default/commit/aa3c48136a829ff1137d8ecb5f367d7b5e05cf0d))


### 1.0.0-beta.1.1.0 (2016-01-29)


#### Features

* **all:** update jspm meta; core-js; aurelia deps ([7777dfcc](http://github.com/aurelia/loader-default/commit/7777dfcca39fb610b7dd66bad868133b2d0c9962))


### 1.0.0-beta.1.0.2 (2016-01-08)


#### Features

* **all:** remove internal normalizeSync use and add normalize impl ([3c323466](http://github.com/aurelia/loader-default/commit/3c323466f461a9831675aa9421968b2727c50164))


## 1.0.0-beta.1.0.1 (2015-11-17)


#### Bug Fixes

* **index:** firefox can die on some module getter accessors ([97dee32c](http://github.com/aurelia/loader-default/commit/97dee32c0df0359ec722ea852ab5529e98ae34be))


### 1.0.0-beta.1 (2015-11-16)


## 0.12.0 (2015-11-10)


#### Bug Fixes

* **text-template-loader:** update to latest template entry api ([9fd102dc](http://github.com/aurelia/loader-default/commit/9fd102dc55af408b0393844442171a7a9b31ca93))


### 0.11.2 (2015-10-13)


#### Bug Fixes

* **all:**
  * remove web components and html imports ([5e40af0f](http://github.com/aurelia/loader-default/commit/5e40af0f22ccf90b7f959fb770cbf2cd5a9f7c8e))
  * improve the template loader interface and html imports lookup ([dec84529](http://github.com/aurelia/loader-default/commit/dec84529b0dc6174c5daa9609ecaf2304515886f))
  * differentiate between real, polyfill and fake system ([09767418](http://github.com/aurelia/loader-default/commit/09767418d730aac3e772c0de954b18159673ee68))
  * update compiler ([11498313](http://github.com/aurelia/loader-default/commit/11498313b369c5752f69190ddecfccaaae7ea32b))
* **build:**
  * update linting, testing and tools ([9b8935a2](http://github.com/aurelia/loader-default/commit/9b8935a297c2b7807acf7be429fe6a528c9ceef8))
  * add missing bower bump ([a3e96402](http://github.com/aurelia/loader-default/commit/a3e96402dbdd48da9904fe228c4ddc5b9d32ef97))
* **index:**
  * sometimes undefined modules list in eachModule iterator ([fe4adddc](http://github.com/aurelia/loader-default/commit/fe4adddce7517c282011f6728b448fbf4d598ef9))
  * incorrect variable name in require-based default loader code ([4cdf9df5](http://github.com/aurelia/loader-default/commit/4cdf9df55d4eecedd5d43fddc9b41871b858818e), closes [#27](http://github.com/aurelia/loader-default/issues/27))
  * add missing import ([8adcd049](http://github.com/aurelia/loader-default/commit/8adcd049f6d25ffa2823a000a82d380a51e1287a))
  * remove unnecessary URL polyfill code ([55d70449](http://github.com/aurelia/loader-default/commit/55d704498ca44afd708859500b12049f1c6fd56c))
  * fix typos in spelling of Promise ([1d0b43f0](http://github.com/aurelia/loader-default/commit/1d0b43f0b7ca2a1b2cd67ced60bc0cb6422ae45d))
  * various url canonicalization bugs ([b373ef6d](http://github.com/aurelia/loader-default/commit/b373ef6d8e17d2ea4a25b6dbe17f5d0d61ead9ab))
  * prepare loader for jspm beta ([62b18e68](http://github.com/aurelia/loader-default/commit/62b18e68c1ccfb19e4e9b862efda679ed7295ae2))
  * remove for..of to improve perf ([b8cce178](http://github.com/aurelia/loader-default/commit/b8cce178a3d745acb1dd66f43507478e49c0ff90))
* **loadTemplate:** check url has baseViewUrl ([fb06ca6b](http://github.com/aurelia/loader-default/commit/fb06ca6be36d4fb36707e47e1ed35d546aa89557))
* **loader:**
  * plugin api fetch causes problems with safari ([7788af12](http://github.com/aurelia/loader-default/commit/7788af127ce0dd3f34efcf671b9b43fd0c95a8fb))
  * change plugin name to view ([4c592bec](http://github.com/aurelia/loader-default/commit/4c592becc0977de24175c5d63a668d7835bd9877))
  * correct name of exported DefaultLoader class ([eb179a30](http://github.com/aurelia/loader-default/commit/eb179a3035acee421d5287b021a66c38ebfe2375))
  * update to work with new origin implementation ([a9072680](http://github.com/aurelia/loader-default/commit/a9072680a7ec4e98e9245cf5a8816cba18b96ae9))
  * don't set target on frozen objects ([ebe91ff2](http://github.com/aurelia/loader-default/commit/ebe91ff2024833c79386d59d0c3a42baad4ddedf))
  * loadModule should check for baseUrl ([7ce79f1c](http://github.com/aurelia/loader-default/commit/7ce79f1c2e5a500a487987288c6832547d1a25a1))
  * incorrect paths passes to systemjs loader ([066bb5d7](http://github.com/aurelia/loader-default/commit/066bb5d7193cc71744e11209636a3f52e4f40009))
* **origin:** short-circuit module registry search on origin location success ([26a2906c](http://github.com/aurelia/loader-default/commit/26a2906c18a5163c877bb129eef448fa98430394))
* **package:**
  * change jspm directories ([176b06ec](http://github.com/aurelia/loader-default/commit/176b06eca87da01ace89bc9725697591c4ce15a8))
  * update dependencies ([496f8c3e](http://github.com/aurelia/loader-default/commit/496f8c3eafa8e519400f825a8697b56056e31669))
  * update reps and fix bower semver ranges ([5c5b5016](http://github.com/aurelia/loader-default/commit/5c5b501676550e0f38dec195af6348bece39e0d1))
  * update dependencies ([0255ec9a](http://github.com/aurelia/loader-default/commit/0255ec9a0220ea0324b806293f2897843298f71b))
  * update Aurelia dependencies ([21511995](http://github.com/aurelia/loader-default/commit/21511995ac06d523417bee3d9b061816479c0120))
  * update to the latest version of path ([792ca4f5](http://github.com/aurelia/loader-default/commit/792ca4f59104401ec52637648553ceb58746a808))
  * add missing dependency ([0462d8b2](http://github.com/aurelia/loader-default/commit/0462d8b2bbd1509181bf1b394a88b85e929a68a1))
  * update dependencies to latest versions ([9da71e4c](http://github.com/aurelia/loader-default/commit/9da71e4c9864138b3ce93bf6c8aa515086dfcfa8))
  * updating dependencies ([eb8b0aed](http://github.com/aurelia/loader-default/commit/eb8b0aed667db21517eb02c26cfd57199cf03325))
* **test:** incorrect constructor used with jasmine.any ([9b21817a](http://github.com/aurelia/loader-default/commit/9b21817a91b9a675abd73a8700ccb4e3e3fa2579))
* **url:** Internet Explorer ([5b1496cb](http://github.com/aurelia/loader-default/commit/5b1496cbe6d7409ff4f9360f65b165456cabd5db))


#### Features

* **all:**
  * implement PAL ([78db72ec](http://github.com/aurelia/loader-default/commit/78db72ec3e335384fc98774d49178f664acc53e5))
  * introduce template loaders; one for html imports and one for text ([babe9484](http://github.com/aurelia/loader-default/commit/babe94840b2292d21f203e68b64ca556d4f27bf5))
  * add more type info ([f12bbca5](http://github.com/aurelia/loader-default/commit/f12bbca550fd78275fe448274f44946aad98f04c))
  * add support for view bundles ([05d333a9](http://github.com/aurelia/loader-default/commit/05d333a94fc6eb9cb6a07da9bdc15a60f961a6d5))
  * implement the new loadText api for the default loader ([e316be6d](http://github.com/aurelia/loader-default/commit/e316be6d1b1eca2d8fe4984280e15a165c2885fe), closes [#4](http://github.com/aurelia/loader-default/issues/4))
  * new loader-plugin-based remplate loader ([ab694b12](http://github.com/aurelia/loader-default/commit/ab694b12f53c06402b0f64d4b60ecacef6490e18))
  * remove system hack; polyfill system for require api; tag through import calls ([7d89aceb](http://github.com/aurelia/loader-default/commit/7d89aceb4775022a6822cb4916d148fda143609a))
* **build:** update compiler and switch to register module format ([762fbfc9](http://github.com/aurelia/loader-default/commit/762fbfc9c463b612d0b286526735da138be90b78))
* **docs:**
  * generate api.json from .d.ts file ([b33a7888](http://github.com/aurelia/loader-default/commit/b33a78882306817ad01184ccdc69037498f1a58f))
  * generate api.json from .d.ts file ([3602db67](http://github.com/aurelia/loader-default/commit/3602db67493cd8d39318fa3e36a04b3e3a9246e5))
* **index:**
  * ensure that DefaultLoader is set as the platfrom loader ([b8e1fb97](http://github.com/aurelia/loader-default/commit/b8e1fb97b7d66f412dcbd5ead151c80bd3370d8a))
  * add new loader methods and encapsulate loader better ([6ee47165](http://github.com/aurelia/loader-default/commit/6ee47165a0cd650cb83435b50176d94234c2a376))
  * add textPluginName property to the default loader ([99d74421](http://github.com/aurelia/loader-default/commit/99d74421d1a65a12206558739d4b45b1519b498e))
* **loader:**
  * add System.forEachModule registry iteration ([a5f983b4](http://github.com/aurelia/loader-default/commit/a5f983b4da03ba1a1c149c03297ad562f28d3569))
  * add loadModule base url override ([d11cb589](http://github.com/aurelia/loader-default/commit/d11cb58926777ec6b5a41c9dcc0a815b6c09e5f5))


### 0.11.1 (2015-10-13)


#### Bug Fixes

* **all:**
  * remove web components and html imports ([5e40af0f](http://github.com/aurelia/loader-default/commit/5e40af0f22ccf90b7f959fb770cbf2cd5a9f7c8e))
  * improve the template loader interface and html imports lookup ([dec84529](http://github.com/aurelia/loader-default/commit/dec84529b0dc6174c5daa9609ecaf2304515886f))
  * differentiate between real, polyfill and fake system ([09767418](http://github.com/aurelia/loader-default/commit/09767418d730aac3e772c0de954b18159673ee68))
  * update compiler ([11498313](http://github.com/aurelia/loader-default/commit/11498313b369c5752f69190ddecfccaaae7ea32b))
* **build:**
  * update linting, testing and tools ([9b8935a2](http://github.com/aurelia/loader-default/commit/9b8935a297c2b7807acf7be429fe6a528c9ceef8))
  * add missing bower bump ([a3e96402](http://github.com/aurelia/loader-default/commit/a3e96402dbdd48da9904fe228c4ddc5b9d32ef97))
* **index:**
  * incorrect variable name in require-based default loader code ([4cdf9df5](http://github.com/aurelia/loader-default/commit/4cdf9df55d4eecedd5d43fddc9b41871b858818e), closes [#27](http://github.com/aurelia/loader-default/issues/27))
  * add missing import ([8adcd049](http://github.com/aurelia/loader-default/commit/8adcd049f6d25ffa2823a000a82d380a51e1287a))
  * remove unnecessary URL polyfill code ([55d70449](http://github.com/aurelia/loader-default/commit/55d704498ca44afd708859500b12049f1c6fd56c))
  * fix typos in spelling of Promise ([1d0b43f0](http://github.com/aurelia/loader-default/commit/1d0b43f0b7ca2a1b2cd67ced60bc0cb6422ae45d))
  * various url canonicalization bugs ([b373ef6d](http://github.com/aurelia/loader-default/commit/b373ef6d8e17d2ea4a25b6dbe17f5d0d61ead9ab))
  * prepare loader for jspm beta ([62b18e68](http://github.com/aurelia/loader-default/commit/62b18e68c1ccfb19e4e9b862efda679ed7295ae2))
  * remove for..of to improve perf ([b8cce178](http://github.com/aurelia/loader-default/commit/b8cce178a3d745acb1dd66f43507478e49c0ff90))
* **loadTemplate:** check url has baseViewUrl ([fb06ca6b](http://github.com/aurelia/loader-default/commit/fb06ca6be36d4fb36707e47e1ed35d546aa89557))
* **loader:**
  * plugin api fetch causes problems with safari ([7788af12](http://github.com/aurelia/loader-default/commit/7788af127ce0dd3f34efcf671b9b43fd0c95a8fb))
  * change plugin name to view ([4c592bec](http://github.com/aurelia/loader-default/commit/4c592becc0977de24175c5d63a668d7835bd9877))
  * correct name of exported DefaultLoader class ([eb179a30](http://github.com/aurelia/loader-default/commit/eb179a3035acee421d5287b021a66c38ebfe2375))
  * update to work with new origin implementation ([a9072680](http://github.com/aurelia/loader-default/commit/a9072680a7ec4e98e9245cf5a8816cba18b96ae9))
  * don't set target on frozen objects ([ebe91ff2](http://github.com/aurelia/loader-default/commit/ebe91ff2024833c79386d59d0c3a42baad4ddedf))
  * loadModule should check for baseUrl ([7ce79f1c](http://github.com/aurelia/loader-default/commit/7ce79f1c2e5a500a487987288c6832547d1a25a1))
  * incorrect paths passes to systemjs loader ([066bb5d7](http://github.com/aurelia/loader-default/commit/066bb5d7193cc71744e11209636a3f52e4f40009))
* **origin:** short-circuit module registry search on origin location success ([26a2906c](http://github.com/aurelia/loader-default/commit/26a2906c18a5163c877bb129eef448fa98430394))
* **package:**
  * change jspm directories ([176b06ec](http://github.com/aurelia/loader-default/commit/176b06eca87da01ace89bc9725697591c4ce15a8))
  * update dependencies ([496f8c3e](http://github.com/aurelia/loader-default/commit/496f8c3eafa8e519400f825a8697b56056e31669))
  * update reps and fix bower semver ranges ([5c5b5016](http://github.com/aurelia/loader-default/commit/5c5b501676550e0f38dec195af6348bece39e0d1))
  * update dependencies ([0255ec9a](http://github.com/aurelia/loader-default/commit/0255ec9a0220ea0324b806293f2897843298f71b))
  * update Aurelia dependencies ([21511995](http://github.com/aurelia/loader-default/commit/21511995ac06d523417bee3d9b061816479c0120))
  * update to the latest version of path ([792ca4f5](http://github.com/aurelia/loader-default/commit/792ca4f59104401ec52637648553ceb58746a808))
  * add missing dependency ([0462d8b2](http://github.com/aurelia/loader-default/commit/0462d8b2bbd1509181bf1b394a88b85e929a68a1))
  * update dependencies to latest versions ([9da71e4c](http://github.com/aurelia/loader-default/commit/9da71e4c9864138b3ce93bf6c8aa515086dfcfa8))
  * updating dependencies ([eb8b0aed](http://github.com/aurelia/loader-default/commit/eb8b0aed667db21517eb02c26cfd57199cf03325))
* **test:** incorrect constructor used with jasmine.any ([9b21817a](http://github.com/aurelia/loader-default/commit/9b21817a91b9a675abd73a8700ccb4e3e3fa2579))
* **url:** Internet Explorer ([5b1496cb](http://github.com/aurelia/loader-default/commit/5b1496cbe6d7409ff4f9360f65b165456cabd5db))


#### Features

* **all:**
  * implement PAL ([78db72ec](http://github.com/aurelia/loader-default/commit/78db72ec3e335384fc98774d49178f664acc53e5))
  * introduce template loaders; one for html imports and one for text ([babe9484](http://github.com/aurelia/loader-default/commit/babe94840b2292d21f203e68b64ca556d4f27bf5))
  * add more type info ([f12bbca5](http://github.com/aurelia/loader-default/commit/f12bbca550fd78275fe448274f44946aad98f04c))
  * add support for view bundles ([05d333a9](http://github.com/aurelia/loader-default/commit/05d333a94fc6eb9cb6a07da9bdc15a60f961a6d5))
  * implement the new loadText api for the default loader ([e316be6d](http://github.com/aurelia/loader-default/commit/e316be6d1b1eca2d8fe4984280e15a165c2885fe), closes [#4](http://github.com/aurelia/loader-default/issues/4))
  * new loader-plugin-based remplate loader ([ab694b12](http://github.com/aurelia/loader-default/commit/ab694b12f53c06402b0f64d4b60ecacef6490e18))
  * remove system hack; polyfill system for require api; tag through import calls ([7d89aceb](http://github.com/aurelia/loader-default/commit/7d89aceb4775022a6822cb4916d148fda143609a))
* **build:** update compiler and switch to register module format ([762fbfc9](http://github.com/aurelia/loader-default/commit/762fbfc9c463b612d0b286526735da138be90b78))
* **docs:**
  * generate api.json from .d.ts file ([b33a7888](http://github.com/aurelia/loader-default/commit/b33a78882306817ad01184ccdc69037498f1a58f))
  * generate api.json from .d.ts file ([3602db67](http://github.com/aurelia/loader-default/commit/3602db67493cd8d39318fa3e36a04b3e3a9246e5))
* **index:**
  * ensure that DefaultLoader is set as the platfrom loader ([b8e1fb97](http://github.com/aurelia/loader-default/commit/b8e1fb97b7d66f412dcbd5ead151c80bd3370d8a))
  * add new loader methods and encapsulate loader better ([6ee47165](http://github.com/aurelia/loader-default/commit/6ee47165a0cd650cb83435b50176d94234c2a376))
  * add textPluginName property to the default loader ([99d74421](http://github.com/aurelia/loader-default/commit/99d74421d1a65a12206558739d4b45b1519b498e))
* **loader:**
  * add System.forEachModule registry iteration ([a5f983b4](http://github.com/aurelia/loader-default/commit/a5f983b4da03ba1a1c149c03297ad562f28d3569))
  * add loadModule base url override ([d11cb589](http://github.com/aurelia/loader-default/commit/d11cb58926777ec6b5a41c9dcc0a815b6c09e5f5))


## 0.11.0 (2015-10-13)


#### Bug Fixes

* **all:**
  * remove web components and html imports ([5e40af0f](http://github.com/aurelia/loader-default/commit/5e40af0f22ccf90b7f959fb770cbf2cd5a9f7c8e))
  * improve the template loader interface and html imports lookup ([dec84529](http://github.com/aurelia/loader-default/commit/dec84529b0dc6174c5daa9609ecaf2304515886f))
  * differentiate between real, polyfill and fake system ([09767418](http://github.com/aurelia/loader-default/commit/09767418d730aac3e772c0de954b18159673ee68))
  * update compiler ([11498313](http://github.com/aurelia/loader-default/commit/11498313b369c5752f69190ddecfccaaae7ea32b))
* **build:**
  * update linting, testing and tools ([9b8935a2](http://github.com/aurelia/loader-default/commit/9b8935a297c2b7807acf7be429fe6a528c9ceef8))
  * add missing bower bump ([a3e96402](http://github.com/aurelia/loader-default/commit/a3e96402dbdd48da9904fe228c4ddc5b9d32ef97))
* **index:**
  * add missing import ([8adcd049](http://github.com/aurelia/loader-default/commit/8adcd049f6d25ffa2823a000a82d380a51e1287a))
  * remove unnecessary URL polyfill code ([55d70449](http://github.com/aurelia/loader-default/commit/55d704498ca44afd708859500b12049f1c6fd56c))
  * fix typos in spelling of Promise ([1d0b43f0](http://github.com/aurelia/loader-default/commit/1d0b43f0b7ca2a1b2cd67ced60bc0cb6422ae45d))
  * various url canonicalization bugs ([b373ef6d](http://github.com/aurelia/loader-default/commit/b373ef6d8e17d2ea4a25b6dbe17f5d0d61ead9ab))
  * prepare loader for jspm beta ([62b18e68](http://github.com/aurelia/loader-default/commit/62b18e68c1ccfb19e4e9b862efda679ed7295ae2))
  * remove for..of to improve perf ([b8cce178](http://github.com/aurelia/loader-default/commit/b8cce178a3d745acb1dd66f43507478e49c0ff90))
* **loadTemplate:** check url has baseViewUrl ([fb06ca6b](http://github.com/aurelia/loader-default/commit/fb06ca6be36d4fb36707e47e1ed35d546aa89557))
* **loader:**
  * plugin api fetch causes problems with safari ([7788af12](http://github.com/aurelia/loader-default/commit/7788af127ce0dd3f34efcf671b9b43fd0c95a8fb))
  * change plugin name to view ([4c592bec](http://github.com/aurelia/loader-default/commit/4c592becc0977de24175c5d63a668d7835bd9877))
  * correct name of exported DefaultLoader class ([eb179a30](http://github.com/aurelia/loader-default/commit/eb179a3035acee421d5287b021a66c38ebfe2375))
  * update to work with new origin implementation ([a9072680](http://github.com/aurelia/loader-default/commit/a9072680a7ec4e98e9245cf5a8816cba18b96ae9))
  * don't set target on frozen objects ([ebe91ff2](http://github.com/aurelia/loader-default/commit/ebe91ff2024833c79386d59d0c3a42baad4ddedf))
  * loadModule should check for baseUrl ([7ce79f1c](http://github.com/aurelia/loader-default/commit/7ce79f1c2e5a500a487987288c6832547d1a25a1))
  * incorrect paths passes to systemjs loader ([066bb5d7](http://github.com/aurelia/loader-default/commit/066bb5d7193cc71744e11209636a3f52e4f40009))
* **origin:** short-circuit module registry search on origin location success ([26a2906c](http://github.com/aurelia/loader-default/commit/26a2906c18a5163c877bb129eef448fa98430394))
* **package:**
  * change jspm directories ([176b06ec](http://github.com/aurelia/loader-default/commit/176b06eca87da01ace89bc9725697591c4ce15a8))
  * update dependencies ([496f8c3e](http://github.com/aurelia/loader-default/commit/496f8c3eafa8e519400f825a8697b56056e31669))
  * update reps and fix bower semver ranges ([5c5b5016](http://github.com/aurelia/loader-default/commit/5c5b501676550e0f38dec195af6348bece39e0d1))
  * update dependencies ([0255ec9a](http://github.com/aurelia/loader-default/commit/0255ec9a0220ea0324b806293f2897843298f71b))
  * update Aurelia dependencies ([21511995](http://github.com/aurelia/loader-default/commit/21511995ac06d523417bee3d9b061816479c0120))
  * update to the latest version of path ([792ca4f5](http://github.com/aurelia/loader-default/commit/792ca4f59104401ec52637648553ceb58746a808))
  * add missing dependency ([0462d8b2](http://github.com/aurelia/loader-default/commit/0462d8b2bbd1509181bf1b394a88b85e929a68a1))
  * update dependencies to latest versions ([9da71e4c](http://github.com/aurelia/loader-default/commit/9da71e4c9864138b3ce93bf6c8aa515086dfcfa8))
  * updating dependencies ([eb8b0aed](http://github.com/aurelia/loader-default/commit/eb8b0aed667db21517eb02c26cfd57199cf03325))
* **test:** incorrect constructor used with jasmine.any ([9b21817a](http://github.com/aurelia/loader-default/commit/9b21817a91b9a675abd73a8700ccb4e3e3fa2579))
* **url:** Internet Explorer ([5b1496cb](http://github.com/aurelia/loader-default/commit/5b1496cbe6d7409ff4f9360f65b165456cabd5db))


#### Features

* **all:**
  * implement PAL ([78db72ec](http://github.com/aurelia/loader-default/commit/78db72ec3e335384fc98774d49178f664acc53e5))
  * introduce template loaders; one for html imports and one for text ([babe9484](http://github.com/aurelia/loader-default/commit/babe94840b2292d21f203e68b64ca556d4f27bf5))
  * add more type info ([f12bbca5](http://github.com/aurelia/loader-default/commit/f12bbca550fd78275fe448274f44946aad98f04c))
  * add support for view bundles ([05d333a9](http://github.com/aurelia/loader-default/commit/05d333a94fc6eb9cb6a07da9bdc15a60f961a6d5))
  * implement the new loadText api for the default loader ([e316be6d](http://github.com/aurelia/loader-default/commit/e316be6d1b1eca2d8fe4984280e15a165c2885fe), closes [#4](http://github.com/aurelia/loader-default/issues/4))
  * new loader-plugin-based remplate loader ([ab694b12](http://github.com/aurelia/loader-default/commit/ab694b12f53c06402b0f64d4b60ecacef6490e18))
  * remove system hack; polyfill system for require api; tag through import calls ([7d89aceb](http://github.com/aurelia/loader-default/commit/7d89aceb4775022a6822cb4916d148fda143609a))
* **build:** update compiler and switch to register module format ([762fbfc9](http://github.com/aurelia/loader-default/commit/762fbfc9c463b612d0b286526735da138be90b78))
* **docs:**
  * generate api.json from .d.ts file ([b33a7888](http://github.com/aurelia/loader-default/commit/b33a78882306817ad01184ccdc69037498f1a58f))
  * generate api.json from .d.ts file ([3602db67](http://github.com/aurelia/loader-default/commit/3602db67493cd8d39318fa3e36a04b3e3a9246e5))
* **index:**
  * ensure that DefaultLoader is set as the platfrom loader ([b8e1fb97](http://github.com/aurelia/loader-default/commit/b8e1fb97b7d66f412dcbd5ead151c80bd3370d8a))
  * add new loader methods and encapsulate loader better ([6ee47165](http://github.com/aurelia/loader-default/commit/6ee47165a0cd650cb83435b50176d94234c2a376))
  * add textPluginName property to the default loader ([99d74421](http://github.com/aurelia/loader-default/commit/99d74421d1a65a12206558739d4b45b1519b498e))
* **loader:**
  * add System.forEachModule registry iteration ([a5f983b4](http://github.com/aurelia/loader-default/commit/a5f983b4da03ba1a1c149c03297ad562f28d3569))
  * add loadModule base url override ([d11cb589](http://github.com/aurelia/loader-default/commit/d11cb58926777ec6b5a41c9dcc0a815b6c09e5f5))


## 0.10.0 (2015-09-04)


#### Bug Fixes

* **all:**
  * remove web components and html imports ([5e40af0f](http://github.com/aurelia/loader-default/commit/5e40af0f22ccf90b7f959fb770cbf2cd5a9f7c8e))
  * improve the template loader interface and html imports lookup ([dec84529](http://github.com/aurelia/loader-default/commit/dec84529b0dc6174c5daa9609ecaf2304515886f))
* **build:** update linting, testing and tools ([9b8935a2](http://github.com/aurelia/loader-default/commit/9b8935a297c2b7807acf7be429fe6a528c9ceef8))
* **index:**
  * add missing import ([8adcd049](http://github.com/aurelia/loader-default/commit/8adcd049f6d25ffa2823a000a82d380a51e1287a))
  * remove unnecessary URL polyfill code ([55d70449](http://github.com/aurelia/loader-default/commit/55d704498ca44afd708859500b12049f1c6fd56c))
  * fix typos in spelling of Promise ([1d0b43f0](http://github.com/aurelia/loader-default/commit/1d0b43f0b7ca2a1b2cd67ced60bc0cb6422ae45d))


#### Features

* **all:** introduce template loaders; one for html imports and one for text ([babe9484](http://github.com/aurelia/loader-default/commit/babe94840b2292d21f203e68b64ca556d4f27bf5))
* **docs:**
  * generate api.json from .d.ts file ([b33a7888](http://github.com/aurelia/loader-default/commit/b33a78882306817ad01184ccdc69037498f1a58f))
  * generate api.json from .d.ts file ([3602db67](http://github.com/aurelia/loader-default/commit/3602db67493cd8d39318fa3e36a04b3e3a9246e5))
* **index:** add textPluginName property to the default loader ([99d74421](http://github.com/aurelia/loader-default/commit/99d74421d1a65a12206558739d4b45b1519b498e))


### 0.9.5 (2015-08-14)


#### Features

* **all:** add more type info ([f12bbca5](http://github.com/aurelia/loader-default/commit/f12bbca550fd78275fe448274f44946aad98f04c))


### 0.9.4 (2015-08-11)


#### Bug Fixes

* **url:** Internet Explorer ([5b1496cb](http://github.com/aurelia/loader-default/commit/5b1496cbe6d7409ff4f9360f65b165456cabd5db))


### 0.9.3 (2015-08-05)


#### Bug Fixes

* **index:** various url canonicalization bugs ([b373ef6d](http://github.com/aurelia/loader-default/commit/b373ef6d8e17d2ea4a25b6dbe17f5d0d61ead9ab))


### 0.9.2 (2015-08-05)


#### Bug Fixes

* **index:** prepare loader for jspm beta ([62b18e68](http://github.com/aurelia/loader-default/commit/62b18e68c1ccfb19e4e9b862efda679ed7295ae2))


### 0.9.1 (2015-07-29)

* improve output file name

## 0.9.0 (2015-07-02)


#### Bug Fixes

* **all:** differentiate between real, polyfill and fake system ([09767418](http://github.com/aurelia/loader-default/commit/09767418d730aac3e772c0de954b18159673ee68))
* **origin:** short-circuit module registry search on origin location success ([26a2906c](http://github.com/aurelia/loader-default/commit/26a2906c18a5163c877bb129eef448fa98430394))


## 0.8.0 (2015-06-08)


#### Features

* **all:** add support for view bundles ([05d333a9](http://github.com/aurelia/loader-default/commit/05d333a94fc6eb9cb6a07da9bdc15a60f961a6d5))
* **loader:** add System.forEachModule registry iteration ([a5f983b4](http://github.com/aurelia/loader-default/commit/a5f983b4da03ba1a1c149c03297ad562f28d3569))


## 0.7.0 (2015-04-30)


#### Bug Fixes

* **index:** remove for..of to improve perf ([b8cce178](http://github.com/aurelia/loader-default/commit/b8cce178a3d745acb1dd66f43507478e49c0ff90))


#### Features

* **all:** implement the new loadText api for the default loader ([e316be6d](http://github.com/aurelia/loader-default/commit/e316be6d1b1eca2d8fe4984280e15a165c2885fe), closes [#4](http://github.com/aurelia/loader-default/issues/4))


## 0.6.0 (2015-04-09)


#### Bug Fixes

* **all:** update compiler ([11498313](http://github.com/aurelia/loader-default/commit/11498313b369c5752f69190ddecfccaaae7ea32b))


## 0.5.0 (2015-03-24)


#### Bug Fixes

* **loader:**
  * plugin api fetch causes problems with safari ([7788af12](http://github.com/aurelia/loader-default/commit/7788af127ce0dd3f34efcf671b9b43fd0c95a8fb))
  * change plugin name to view ([4c592bec](http://github.com/aurelia/loader-default/commit/4c592becc0977de24175c5d63a668d7835bd9877))


#### Features

* **all:** new loader-plugin-based remplate loader ([ab694b12](http://github.com/aurelia/loader-default/commit/ab694b12f53c06402b0f64d4b60ecacef6490e18))


### 0.4.3 (2015-02-28)


#### Bug Fixes

* **package:** change jspm directories ([176b06ec](http://github.com/aurelia/loader-default/commit/176b06eca87da01ace89bc9725697591c4ce15a8))


### 0.4.2 (2015-02-27)


#### Bug Fixes

* **build:** add missing bower bump ([a3e96402](http://github.com/aurelia/loader-default/commit/a3e96402dbdd48da9904fe228c4ddc5b9d32ef97))
* **package:** update dependencies ([496f8c3e](http://github.com/aurelia/loader-default/commit/496f8c3eafa8e519400f825a8697b56056e31669))


### 0.4.1 (2015-01-24)


#### Bug Fixes

* **package:** update reps and fix bower semver ranges ([5c5b5016](http://github.com/aurelia/loader-default/commit/5c5b501676550e0f38dec195af6348bece39e0d1))


## 0.4.0 (2015-01-22)


#### Bug Fixes

* **loader:**
  * correct name of exported DefaultLoader class ([eb179a30](http://github.com/aurelia/loader-default/commit/eb179a3035acee421d5287b021a66c38ebfe2375))
  * update to work with new origin implementation ([a9072680](http://github.com/aurelia/loader-default/commit/a9072680a7ec4e98e9245cf5a8816cba18b96ae9))
* **package:** update dependencies ([0255ec9a](http://github.com/aurelia/loader-default/commit/0255ec9a0220ea0324b806293f2897843298f71b))


#### Features

* **all:** remove system hack; polyfill system for require api; tag through import calls ([7d89aceb](http://github.com/aurelia/loader-default/commit/7d89aceb4775022a6822cb4916d148fda143609a))


### 0.3.2 (2015-01-12)


#### Bug Fixes

* **package:** update Aurelia dependencies ([21511995](http://github.com/aurelia/loader-systemjs/commit/21511995ac06d523417bee3d9b061816479c0120))


### 0.3.1 (2015-01-06)


#### Bug Fixes

* **loader:** don't set target on frozen objects ([ebe91ff2](http://github.com/aurelia/loader-systemjs/commit/ebe91ff2024833c79386d59d0c3a42baad4ddedf))


## 0.3.0 (2015-01-06)


#### Features

* **build:** update compiler and switch to register module format ([762fbfc9](http://github.com/aurelia/loader-systemjs/commit/762fbfc9c463b612d0b286526735da138be90b78))
* **loader:** add loadModule base url override ([d11cb589](http://github.com/aurelia/loader-systemjs/commit/d11cb58926777ec6b5a41c9dcc0a815b6c09e5f5))


### 0.2.2 (2014-12-18)


#### Bug Fixes

* **package:** update to the latest version of path ([792ca4f5](http://github.com/aurelia/loader-systemjs/commit/792ca4f59104401ec52637648553ceb58746a808))


### 0.2.1 (2014-12-17)


#### Bug Fixes

* **package:** add missing dependency ([0462d8b2](http://github.com/aurelia/loader-systemjs/commit/0462d8b2bbd1509181bf1b394a88b85e929a68a1))


## 0.2.0 (2014-12-17)


#### Bug Fixes

* **loadTemplate:** check url has baseViewUrl ([fb06ca6b](http://github.com/aurelia/loader-systemjs/commit/fb06ca6be36d4fb36707e47e1ed35d546aa89557))
* **package:** update dependencies to latest versions ([9da71e4c](http://github.com/aurelia/loader-systemjs/commit/9da71e4c9864138b3ce93bf6c8aa515086dfcfa8))


### 0.1.2 (2014-12-11)


#### Bug Fixes

* **package:** updating dependencies ([eb8b0aed](http://github.com/aurelia/loader-systemjs/commit/eb8b0aed667db21517eb02c26cfd57199cf03325))


### 0.1.1 (2014-12-11)


#### Bug Fixes

* **loader:** loadModule should check for baseUrl ([7ce79f1c](http://github.com/aurelia/loader-systemjs/commit/7ce79f1c2e5a500a487987288c6832547d1a25a1))


## 0.1.0 (2014-12-11)


#### Bug Fixes

* **loader:** incorrect paths passed to systemjs loader ([066bb5d7](http://github.com/aurelia/loader-systemjs/commit/066bb5d7193cc71744e11209636a3f52e4f40009))
