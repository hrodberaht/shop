import * as types from './types';
import config from '../../config/config';

const fetchProductsSucces = products => ({
  type: types.FETCH_PRODUCTS,
  products,
  loaded: true,
});

const fetchProductsError = error => ({
  type: types.FETCH_PRODUCTS_ERROR,
  errors: error,
});

const fetchProducts = token => dispatch => fetch(`${config.url}products`, {
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then(res => res.json())
  .then((res) => {
    dispatch(fetchProductsSucces(res));
  })
  .catch((error) => {
    dispatch(fetchProductsError(error));
  });

export default fetchProducts;
