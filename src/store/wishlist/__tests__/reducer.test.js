import wishlist from '../reducer';
import * as types from '../types';

const initialState = {
  products: [],
  loaded: false,
  userId: null,
  errors: null,
};

describe('wishlist reducer', () => {
  it('should return the initial state', () => {
    expect(wishlist(undefined, {})).toEqual({
      products: [],
      loaded: false,
      userId: null,
      errors: null,
    });
  });
  it('should handle FETCH_WISHLIST', () => {
    expect(
      wishlist(
        {},
        {
          type: types.FETCH_WISHLIST,
          products: { products: [] },
          loaded: true,
        },
      ),
    ).toEqual({
      products: [],
      loaded: true,
    });
  });
  it('should handle ADD_PRODUCT', () => {
    const product = {
      id: 'product-1',
      type: 'Printer',
      name: 'ZX3',
      price: '400',
      inStock: '30',
    };
    expect(
      wishlist(
        { products: [] },
        {
          type: types.ADD_TO_WISHLIST,
          product,
        },
      ),
    ).toEqual({
      products: [].concat(product),
    });
  });
  it('should handle UPDATE_PRODUCT', () => {
    const expected = {
      products: [],
      loaded: false,
      userId: null,
      errors: null,
    };
    const product = {
      id: 'product-1',
      type: 'Printer',
      name: 'ZX3',
      price: '600',
      inStock: '50',
    };
    expect(
      wishlist(initialState, {
        type: types.REMOVE_FROM_WISHLIST,
        product,
      }),
    ).toEqual(expected);
  });
  it('should handle ERROR_WISHLIST', () => {
    const error = 'error';
    const expected = {
      products: [],
      loaded: false,
      userId: null,
      errors: error,
    };

    expect(
      wishlist(initialState, {
        type: types.ERROR_WISHLIST,
        error,
      }),
    ).toEqual(expected);
  });
});
