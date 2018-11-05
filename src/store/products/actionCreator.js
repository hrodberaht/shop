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

const addProductSucces = product => ({
  type: types.ADD_PRODUCT,
  product,
});

const addProductError = error => ({
  type: types.ADD_PRODUCT_ERROR,
  errors: error,
});

const removeProductSucces = product => ({
  type: types.REMOVE_PRODUCT,
  product,
});

const removeProductError = error => ({
  type: types.ADD_PRODUCT_ERROR,
  errors: error,
});

const updateProductSucces = product => ({
  type: types.UDATE_PRODUCT,
  product,
});

export const fetchProducts = token => dispatch => fetch(`${config.url}products`, {
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
  .catch(() => {
    dispatch(fetchProductsError('Sorry server is down'));
  });

export const addProduct = (product, token) => dispatch => fetch(`${config.url}products`, {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(product),
})
  .then(res => res.json())
  .then(res => dispatch(addProductSucces(res)))
  .catch(error => dispatch(addProductError(error)));

export const removeProduct = (id, token) => dispatch => fetch(`${config.url}products/${id}`, {
  method: 'put',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ remove: true }),
})
  .then(res => res.json())
  .then((res) => {
    dispatch(removeProductSucces(res));
  })
  .catch(error => dispatch(removeProductError(error)));

export const updateProduct = (product, token) => dispatch => fetch(`${config.url}product/${product.id}`, {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(product),
})
  .then(res => res.json())
  .then((res) => {
    dispatch(updateProductSucces(res));
  })
  .catch(error => dispatch(removeProductError(error)));
