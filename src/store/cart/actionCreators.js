import * as types from './types';
import dataFetcher from '../../shared/dataFetcher';
import { getAllOrderPositionsInCart } from './selectors';

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

export const addProductToCart = cartPosition => dispatch => dataFetcher('orderPositions', 'post', cartPosition)
  .then(res => dispatch(addProductToCartSuccess(res)))
  .catch(error => dispatch(errorInCart(error)));

export const updateProductInCart = product => (dispatch, getState) => {
  const { pcsOrder, totalPrice } = product;
  const orderPositions = getAllOrderPositionsInCart(getState());
  const orderPositionId = orderPositions.find(position => position.productId === product.productId);
  const combinedPcsProduct = {
    orderPositionId: orderPositionId.id,
    pcsOrder: orderPositionId.pcsOrder + pcsOrder,
    totalPrice: orderPositionId.totalPrice + totalPrice,
  };
  return dataFetcher('orderPositions', 'put', combinedPcsProduct)
    .then(res => dispatch(updateProductInCartSuccess(res)))
    .catch(error => dispatch(errorInCart(error)));
};
export const updateQuantityInCart = cartPosition => dispatch => dataFetcher(`orderPositions/${cartPosition.id}`, 'put', cartPosition)
  .then(res => dispatch(updateProductInCartSuccess(res)))
  .catch(error => dispatch(errorInCart(error)));
