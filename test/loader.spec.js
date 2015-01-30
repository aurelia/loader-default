import {DefaultLoader} from '../src/index';

describe('the system.js loader', () => {
  it('should have some tests', () => {
    var loader = new DefaultLoader();
    expect(loader).not.toBe(null);
  });
});
