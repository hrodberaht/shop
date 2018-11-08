import * as types from './types';
import config from '../../config/config';

const addtoWhisListSucces = (product, userId) => ({
  type: types.ADD_TO_WHISLIST,
  product,
  userId,
});

const fetchWhislistSucces = products => ({
  type: types.FETCH_WHISLIST,
  products,
  loaded: true,
});

export const removeProductFromWhisListSucces = productId => ({
  type: types.REMOVE_FROM_WHISLIST,
  productId,
});

export const fetchWhislist = (userId, token) => dispatch => fetch(`${config.url}whislists`, {
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then(res => res.json())
  .then((res) => {
    const products = res.find(prod => prod.userId === userId);
    dispatch(fetchWhislistSucces(products));
  })
  .catch(err => console.log(err));

export const addToWhisList = (product, userId, token) => dispatch => fetch(`${config.url}whislists`, {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ product, userId }),
})
  .then(res => res.json())
  .then((res) => {
    dispatch(addtoWhisListSucces(res.product, res.userId));
  })
  .catch(error => console.log(error));

export const removeProductWhisList = (productId, userId, token) => dispatch => fetch(`${config.url}whislists/`, {
  method: 'delete',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ productId, userId }),
})
  .then(res => res.json())
  .then((res) => {
    dispatch(removeProductFromWhisListSucces(res));
  })
  .catch(error => console.log(error));
