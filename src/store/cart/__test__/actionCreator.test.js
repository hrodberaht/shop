import { addProductToCart, clearCart } from '../actionCreator';
import * as types from '../types';

describe('cart actions', () => {
  const product = {
    id: '1',
    name: 'fx',
    price: 400,
    pcs: 2,
    totalPrice: 800,
  };
  it('should call addProductToCart when type ADD_TO_CART', () => {
    const expectedActions = {
      type: types.ADD_TO_CART,
      product,
    };

    expect(addProductToCart(product)).toEqual(expectedActions);
  });

  it('should call clearCart when type CLEAR_CART', () => {
    const expectedActions = {
      type: types.CLEAR_CART,
      empty: [],
    };

    expect(clearCart()).toEqual(expectedActions);
  });
});
