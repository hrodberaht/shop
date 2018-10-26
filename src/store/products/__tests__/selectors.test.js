import * as selectors from '../selectors';

describe('selectors for auth', () => {
  const state = {
    products: {
      products: [],
      loaded: false,
      errors: 'error',
    },
  };

  it('should return array of products', () => {
    expect(selectors.getProductsAll(state)).toEqual([]);
  });
  it('should return value loaded', () => {
    expect(selectors.getProductsLoaded(state)).toBe(false);
  });

  it('should return value of error', () => {
    expect(selectors.getProductsError(state)).toBe('error');
  });
});
