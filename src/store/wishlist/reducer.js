import * as types from './types';

const initialState = {
  products: [],
  userId: null,
  loaded: false,
  errors: null,
};

const wishlist = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_WISHLIST:
      return { ...state, ...action.products, ...{ loaded: action.loaded } };
    case types.ADD_TO_WISHLIST:
      return {
        ...state,
        ...{ products: state.products.concat(action.product), userId: action.userId },
      };
    case types.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        products: state.products.filter(prod => prod.productId !== action.productId),
      };
    case types.ERROR_WISHLIST:
      return {
        ...state,
        ...{ errors: action.error },
      };
    default:
      return state;
  }
};

export default wishlist;
