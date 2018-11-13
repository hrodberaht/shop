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
  it('should return value loaded false', () => {
    expect(selectors.getWishlistLoaded(state)).toBe(false);
  });
  it('should return value loaded true', () => {
    state.wishlist.loaded = true;
    expect(selectors.getWishlistLoaded(state)).toBe(true);
  });
});
