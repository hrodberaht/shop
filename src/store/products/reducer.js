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
    case types.UDATE_PRODUCT:
      return {
        ...state,
        ...{
          products: state.products.map(
            product => (product.id === action.product.id ? action.product : product),
          ),
        },
      };
    case types.REMOVE_PRODUCT:
      return {
        ...state,
        ...{
          products: state.products.map(
            product => (product.id === action.product.id ? action.product : product),
          ),
        },
      };
    default:
      return state;
  }
};

export default products;
