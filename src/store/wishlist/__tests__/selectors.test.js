import * as selectors from '../selectors';

describe('selectors for auth', () => {
  const state = {
    whislist: {
      products: [],
      loaded: false,
      errors: 'error',
    },
  };

  it('should return array of products', () => {
    expect(selectors.getWhislistProducts(state)).toEqual([]);
  });
  it('should return value loaded', () => {
    expect(selectors.getWhislistLoaded(state)).toBe(false);
  });
});
