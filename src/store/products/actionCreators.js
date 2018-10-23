import * as types from './types';
import config from '../../config/config';

const fetchProductsSucces = products => ({
  type: types.FETCH_PRODUCTS,
  products,
  loaded: true,
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
  });

export default fetchProducts;
