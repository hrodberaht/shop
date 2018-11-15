import * as types from './types';
import config from '../../config/config';

export const addProductToCartSuccess = payload => ({
  type: types.ADD_TO_CART,
  payload,
});

export const clearCart = () => ({
  type: types.CLEAR_CART,
  empty: [],
});

export const removeFromCart = payload => ({
  type: types.REMOVE_FROM_CART,
  payload,
});

export const updateProductInCartSuccess = payload => ({
  type: types.UPDATE_IN_CART,
  payload,
});

export const addProductToCart = (product, token) => (dispatch) => {
  fetch(`${config.url}orderPositions`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  })
    .then(res => res.json())
    .then((res) => {
      dispatch(addProductToCartSuccess(res));
    })
    .catch(error => console.log(error));
};

export const updateProductInCart = (product, token) => (dispatch) => {
  fetch(`${config.url}orderPositions`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  })
    .then(res => res.json())
    .then((res) => {
      dispatch(updateProductInCartSuccess(res));
    })
    .catch(error => console.log(error));
};
