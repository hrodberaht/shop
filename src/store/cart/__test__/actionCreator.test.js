import { clearCart } from '../actionCreator';
import * as types from '../types';

describe('cart actions', () => {
  it('should call clearCart when type CLEAR_CART', () => {
    const expectedActions = {
      type: types.CLEAR_CART,
      empty: [],
    };

    expect(clearCart()).toEqual(expectedActions);
  });
});
