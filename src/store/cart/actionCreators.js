import * as types from './types';
import config from '../../config/config';

export const addProductToCartSucces = product => ({
  type: types.ADD_TO_CART,
  product,
});

export const clearCart = () => ({
  type: types.CLEAR_CART,
  empty: [],
});

export const removeFromCart = id => ({
  type: types.REMOVE_FROM_CART,
  id,
});

export const updateProductInCartSucces = product => ({
  type: types.UPDATE_IN_CART,
  product,
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
      dispatch(addProductToCartSucces(res));
    })
    .catch(error => console.log(error));
};

export const updateProductInCart = (product, token) => (dispatch) => {
  fetch(`${config.url}orderPositions/${product.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  })
    .then(res => res.json())
    .then((res) => {
      dispatch(updateProductInCartSucces(res));
    })
    .catch(error => console.log(error));
};
