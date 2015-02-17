import {DefaultLoader} from '../src/index';

describe('the system.js loader', () => {
  it('should create DefaultLoader when createDefaultLoader is called', () => {
    expect(DefaultLoader.createDefaultLoader()).toEqual(jasmine.any(DefaultLoader));
  });

  describe('instance method', () => {
    var loader, baseUrl, baseViewUrl;
    beforeEach(() => {
      baseUrl = System.baseUrl;
      baseViewUrl = System.baseViewUrl;
      System.baseUrl = 'test/fixtures';
      loader = DefaultLoader.createDefaultLoader();
    });

    afterEach(() => {
      System.baseUrl = baseUrl;
      System.baseViewUrl = baseViewUrl;
    });

    describe('loadModule', () => {
      it('should load a module relative to the base url', (done) => {
        loader.loadModule('baseModule')
          .then((result) => {
            expect(result).toEqual(jasmine.any(Object));
            expect(result.default).toEqual(jasmine.any(Function));
            expect(result.default()).toEqual("baseModule hello");
          })
          .catch((reason) => expect(false).toBeTruthy(reason))
          .then(done);
      });

      it("should fail if the module doesn't exist", (done) => {
        loader.loadModule('notHere')
          .then(result => expect(false).toBeTruthy('No module should have been found'))
          .catch(reason => expect(reason).toEqual(jasmine.any(String)))
          .then(done);
      });

      it("should cache any repeated module calls", (done) => {
        let importSpy = spyOn(System, 'import').and.callThrough();

        //If both calls are done right after each other then the loader won't cache.
        //Perhaps this is a potential optimization
        loader.loadModule('baseModule').then(() => {
          return loader.loadModule('baseModule').then(() => {
            expect(importSpy.calls.count()).toEqual(1);
          });
        })
          .catch((reason) => expect(false).toBeTruthy(reason))
          .then(done);
      });

      it("should load a module with a new base path", (done) => {
        loader.loadModule('rebasedModule', 'test/fixtures/moduleBase')
          .then((result) => {
            expect(result).toEqual(jasmine.any(Object));
            expect(result.default).toEqual(jasmine.any(Function));
            expect(result.default()).toEqual("rebasedModule hello");
          })
          .catch((reason) => expect(false).toBeTruthy(reason))
          .then(done);
      });
    });

    describe('loadAllModules()', () => {

      it("will return when all modules are loaded", (done) => {
        loader.loadAllModules(['baseModule', 'moduleBase/rebasedModule'])
          .then((results) => {
            expect(results.length).toBe(2);
            for (let result of results) {
              expect(result).toEqual(jasmine.any(Object));
              expect(result.default).toEqual(jasmine.any(Function));
              expect(result.default()).toEqual(jasmine.any(String));
            }
          })
          .catch((reason) => expect(false).toBeTruthy(reason))
          .then(done);
      });

      it("will fail if any modules fail to load", (done) => {
        loader.loadAllModules(['baseModule', 'doesntExist'])
          .then(() => expect(false).toBeTruthy('No Modules should have loaded'))
          .catch((reason) => expect(reason).toEqual(jasmine.any(String)))
          .then(done);
      });
    });

    describe('loadTemplate()', () => {

      it('will load a template using the System.baseUrl', (done) => {
        System.baseUrl = 'base/test/fixtures';
        loader = DefaultLoader.createDefaultLoader();

        loader.loadTemplate('baseTemplate.html')
        .then((result) => {
            expect(result).toEqual(jasmine.any(Node));
            expect(result.innerHTML).toBe("<h1>I am the base template</h1>")
          })
        .catch((reason) => expect(false).toBeTruthy(reason))
        .then(done);
      });

      it('will load a template using the System.viewBaseUrl', (done) => {
        System.baseUrl = 'base/test/fixtures/viewBase';
        loader = DefaultLoader.createDefaultLoader();

        loader.loadTemplate('rebasedTemplate.html')
          .then((result) => {
            expect(result).toEqual(jasmine.any(Node));
            expect(result.innerHTML).toBe("<h1>I am the rebased template</h1>")
          })
          .catch((reason) => expect(false).toBeTruthy(reason))
          .then(done);
      });

      //At this point I can't test for failing template loads as they never resolve.
      //This is an issue with tbe base loader.
    });

  });
});
