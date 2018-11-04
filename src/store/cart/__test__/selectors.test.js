import { getProductsInCart } from '../selectors';

describe('cart selectors', () => {
  const state = {
    cart: [
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
    ],
  };
  it('should return value of cart', () => {
    expect(getProductsInCart(state)).toEqual(state.cart);
  });
});
