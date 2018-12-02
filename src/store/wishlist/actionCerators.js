import * as types from './types';
import config from '../../config/config';

const addtoWishlistSuccess = (product, userId) => ({
  type: types.ADD_TO_WISHLIST,
  product,
  userId,
});

const fetchWishlistSuccess = products => ({
  type: types.FETCH_WISHLIST,
  products,
  loaded: true,
});

const removeProductFromWishlistSuccess = productId => ({
  type: types.REMOVE_FROM_WISHLIST,
  productId,
});

export const wishlistsErrors = error => ({
  type: types.ERROR_WISHLIST,
  errors: error,
});

export const fetchWishlist = (userId, token) => dispatch => fetch(`${config.url}wishlists`, {
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then(res => res.json())
  .then((res) => {
    const products = res.find(prod => prod.userId === userId);
    dispatch(fetchWishlistSuccess(products));
  })
  .catch(error => dispatch(wishlistsErrors(error)));

export const addToWishlist = (product, userId, token) => dispatch => fetch(`${config.url}wishlists`, {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ product, userId }),
})
  .then(res => res.json())
  .then((res) => {
    if (res.message) return;
    dispatch(addtoWishlistSuccess(res.product, res.userId));
  })
  .catch(error => dispatch(wishlistsErrors(error)));

export const removeProductWishlist = (productId, userId, token) => dispatch => fetch(`${config.url}wishlists`, {
  method: 'delete',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ productId, userId }),
})
  .then(res => res.json())
  .then((res) => {
    dispatch(removeProductFromWishlistSuccess(res));
  })
  .catch(error => dispatch(wishlistsErrors(error)));
