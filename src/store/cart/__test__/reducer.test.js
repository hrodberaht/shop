import reducer from '../reducer';
import * as types from '../types';

describe('cart reducer', () => {
  const product = [
    {
      id: '1',
      name: 'fx',
      price: 400,
      pcs: 2,
      totalPrice: 800,
    },
    {
      id: '1',
      name: 'fx',
      price: 400,
      pcs: 2,
      totalPrice: 800,
    },
  ];
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle ADD_TO_CART', () => {
    expect(
      reducer([], {
        type: types.ADD_TO_CART,
        product,
      }),
    ).toEqual(product);
  });
  it('should handle CLEAR_CART', () => {
    expect(
      reducer(product, {
        type: types.CLEAR_CART,
        empty: [],
      }),
    ).toEqual([]);
  });
});
