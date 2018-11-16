import { clearCart } from '../actionCreators';
import * as types from '../types';

describe('cart actions', () => {
  it('should call clearCart when type CLEAR_CART', () => {
    const expectedActions = {
      type: types.CLEAR_CART,
    };

    expect(clearCart()).toEqual(expectedActions);
  });
});
