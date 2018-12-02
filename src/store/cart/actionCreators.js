import * as types from './types';
import dataFetcher from '../../shared/dataFetcher';

export const addProductToCartSuccess = payload => ({
  type: types.ADD_TO_CART,
  payload,
});

export const clearCart = () => ({
  type: types.CLEAR_CART,
});

export const removeFromCart = payload => ({
  type: types.REMOVE_FROM_CART,
  payload,
});

export const updateProductInCartSuccess = payload => ({
  type: types.UPDATE_IN_CART,
  payload,
});

export const errorInCart = payload => ({
  type: types.ERRORS_IN_CART,
  payload,
});

export const addProductToCart = (cartPosition, token) => dispatch => dataFetcher('orderPositions', 'post', token, cartPosition)
  .then(res => dispatch(addProductToCartSuccess(res)))
  .catch(error => dispatch(errorInCart(error)));

export const updateProductInCart = (cartPosition, token) => dispatch => dataFetcher('orderPositions', 'put', token, cartPosition)
  .then(res => dispatch(updateProductInCartSuccess(res)))
  .catch(error => dispatch(errorInCart(error)));

export const updateQuantityInCart = (cartPosition, token) => dispatch => dataFetcher(`orderPositions/${cartPosition.id}`, 'put', token, cartPosition)
  .then(res => dispatch(updateProductInCartSuccess(res)))
  .catch(error => dispatch(errorInCart(error)));
