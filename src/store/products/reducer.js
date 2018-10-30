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
    default:
      return state;
  }
};

export default products;