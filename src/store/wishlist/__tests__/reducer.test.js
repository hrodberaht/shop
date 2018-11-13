import whislist from '../reducer';
import * as types from '../types';

const initialState = {
  products: [],
  loaded: false,
  userId: null,
  errors: null,
};

describe('whislist reducer', () => {
  it('should return the initial state', () => {
    expect(whislist(undefined, {})).toEqual({
      products: [],
      loaded: false,
      userId: null,
      errors: null,
    });
  });
  it('should handle FETCH_WHISLIST', () => {
    expect(
      whislist(
        {},
        {
          type: types.FETCH_WHISLIST,
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
      whislist(
        { products: [] },
        {
          type: types.ADD_TO_WHISLIST,
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
      whislist(initialState, {
        type: types.REMOVE_FROM_WHISLIST,
        product,
      }),
    ).toEqual(expected);
  });
  it('should handle ERROR_WHISLIST', () => {
    const error = 'error';
    const expected = {
      products: [],
      loaded: false,
      userId: null,
      errors: error,
    };

    expect(
      whislist(initialState, {
        type: types.ERROR_WHISLIST,
        error,
      }),
    ).toEqual(expected);
  });
});
