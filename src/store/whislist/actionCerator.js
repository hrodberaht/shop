import * as types from './types';
import config from '../../config/config';

export const addtoWhisListSucces = (product, userId) => ({
  type: types.ADD_TO_WHISLIST,
  product,
  userId,
});

export const removeProductFromWhisListSucces = (product, userId) => ({
  type: types.REMOVE_FROM_WHISLIST,
  product,
  userId,
});

export const addToWhisList = (product, userId, token) => dispatch => fetch(`${config.url}whislists`, {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ product, userId }),
})
  .then(res => res.json())
  .then(res => dispatch(addtoWhisListSucces(res)));
// .catch(error => dispatch(productErrors(error)));
