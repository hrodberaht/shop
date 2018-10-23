import * as types from './types';

const initialState = {
  products: [],
  loaded: false,
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS:
      return { ...state, ...{ products: action.products, loaded: action.loaded } };
    default:
      return state;
  }
};

export default products;
