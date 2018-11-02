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
