import products from '../reducer';
import * as types from '../types';

describe('products reducer', () => {
  it('should return the initial state', () => {
    expect(products(undefined, {})).toEqual({
      products: [],
      loaded: false,
      errors: null,
    });
  });
  it('should handle FETCH_PRODUCTS', () => {
    expect(
      products(
        {},
        {
          type: types.FETCH_PRODUCTS,
          products: [],
          loaded: true,
        },
      ),
    ).toEqual({
      products: [],
      loaded: true,
    });
  });
  it('should handle FETCH_PRODUCTS_ERROR', () => {
    expect(
      products(
        {},
        {
          type: types.FETCH_PRODUCTS_ERROR,
          errors: 'Somthing went wrong',
        },
      ),
    ).toEqual({
      errors: 'Somthing went wrong',
    });
  });
});
