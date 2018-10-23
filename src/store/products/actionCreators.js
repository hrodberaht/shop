import * as types from './types';

export const fetchProducts = products => ({
  type: types.FETCH_PRODUCTS,
  products,
});
