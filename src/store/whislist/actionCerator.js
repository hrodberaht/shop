import * as types from './types';

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
