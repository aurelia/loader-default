import './setup';
import {DefaultLoader} from '../src/index';

describe('the system.js loader', () => {
  describe('instance method', () => {
    var loader;
    beforeEach(() => {
      System.config({
        "paths": {
          "*": "test/fixtures/*.js"
        }
      });

      loader = new DefaultLoader();
    });

    describe('loadModule', () => {
      it('should load a module', (done) => {
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
          .catch(reason => expect(reason).toEqual(jasmine.any(Error)))
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
          .catch((reason) => expect(reason).toEqual(jasmine.any(Error)))
          .then(done);
      });
    });

    describe('loadTemplate()', () => {

      it('will load a template', (done) => {
        loader.loadTemplate('baseTemplate.html')
        .then((result) => {
            expect(result.template.innerHTML).toBe("<h1>I am the base template</h1>");
          })
        .catch((reason) => expect(false).toBeTruthy(reason))
        .then(done);
      });

      //At this point I can't test for failing template loads as they never resolve.
      //This is an issue with tbe base loader.
    });

  });
});
