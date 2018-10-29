import * as types from './types';

export const addProductToCart = product => ({
  type: types.ADD_TO_CART,
  product,
});

export const clearCart = () => ({
  type: types.CLEAR_CART,
  empty: [],
});
