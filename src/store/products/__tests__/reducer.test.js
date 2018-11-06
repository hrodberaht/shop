import products from '../reducer';
import * as types from '../types';

const initialState = {
  products: [
    {
      id: 'product-1',
      type: 'Printer',
      name: 'ZX3',
      price: '600',
      inStock: '50',
    },
  ],
  loaded: false,
  errors: null,
};

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
  it('should handle PRODUCTS_ERROR', () => {
    expect(
      products(
        {},
        {
          type: types.PRODUCTS_ERROR,
          errors: 'Somthing went wrong',
        },
      ),
    ).toEqual({
      errors: 'Somthing went wrong',
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
      products(
        { products: [] },
        {
          type: types.ADD_PRODUCT,
          product,
        },
      ),
    ).toEqual({
      products: [].concat(product),
    });
  });
  it('should handle UPDATE_PRODUCT', () => {
    const expected = {
      products: [
        {
          id: 'product-1',
          type: 'Printer',
          name: 'ZX3',
          price: '600',
          inStock: '50',
        },
      ],
      loaded: false,
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
      products(initialState, {
        type: types.UPDATE_PRODUCT,
        product,
      }),
    ).toEqual(expected);
  });
});
