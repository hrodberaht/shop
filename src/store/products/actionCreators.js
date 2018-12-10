import * as types from './types';
import config from '../../config/config';

const fetchProductsSuccess = products => ({
  type: types.FETCH_PRODUCTS,
  products,
  loaded: true,
});

const addProductSuccess = product => ({
  type: types.ADD_PRODUCT,
  product,
});

const productErrors = error => ({
  type: types.PRODUCTS_ERROR,
  errors: error,
});

const removeProductSuccess = product => ({
  type: types.REMOVE_PRODUCT,
  product,
});

const updateProductSuccess = product => ({
  type: types.UDATE_PRODUCT,
  product,
});

const QUERY_PRODUCTS = `{
 products{
   id
   imgUrl
   type
   name
   price
   inStock
 }
}`;

export const fetchProducts = token => dispatch => fetch(`http://127.0.0.1:4000/graphql?query=${QUERY_PRODUCTS}`)
  .then(res => res.json())
  .then((res) => {
    dispatch(fetchProductsSuccess(res.data.products));
  })
  .catch(() => {
    dispatch(productErrors('Sorry server is down'));
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
  .then(res => dispatch(addProductSuccess(res)))
  .catch(error => dispatch(productErrors(error)));

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
    dispatch(removeProductSuccess(res));
  })
  .catch(error => dispatch(productErrors(error)));

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
    dispatch(updateProductSuccess(res));
  })
  .catch(error => dispatch(productErrors(error)));
