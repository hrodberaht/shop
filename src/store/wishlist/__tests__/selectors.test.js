import * as selectors from '../selectors';

describe('selectors for whislist', () => {
  const state = {
    wishlist: {
      products: [],
      loaded: false,
      errors: 'error',
    },
  };

  it('should return array of products', () => {
    expect(selectors.getWishlistProducts(state)).toEqual([]);
  });
  it('should return value loaded', () => {
    expect(selectors.getWishlistLoaded(state)).toBe(false);
  });
});
