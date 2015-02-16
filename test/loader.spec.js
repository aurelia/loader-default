import {DefaultLoader} from '../src/index';

describe('the system.js loader', () => {
  it('should create DefaultLoader when createDefaultLoader is called', () => {
    expect(DefaultLoader.createDefaultLoader()).toEqual(jasmine.any(DefaultLoader));
  });

  describe('instance method', () => {
    var loader, baseUrl, baseViewUrl;
    beforeEach(() => {
      loader = DefaultLoader.createDefaultLoader();
      baseUrl = System.baseUrl;
      baseViewUrl = System.baseViewUrl;
    });

    afterEach(() => {
      System.baseUrl = baseUrl;
      System.baseViewUrl = baseViewUrl;
    });

  });
});
