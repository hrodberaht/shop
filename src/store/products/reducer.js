import * as types from './types';

const initialState = {
  products: [],
  loaded: false,
  errors: null,
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS:
      return { ...state, ...{ products: action.products, loaded: action.loaded } };
    case types.FETCH_PRODUCTS_ERROR:
      return { ...state, errors: action.errors };
    case types.ADD_PRODUCT:
      return { ...state, ...{ products: state.products.concat(action.product) } };
    case types.ADD_PRODUCT_ERROR:
      return { ...state, errors: action.errors };
    case types.REMOVE_PRODUCT:
      return { ...state };
    default:
      return state;
  }
};

export default products;
