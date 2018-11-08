import * as types from './types';

const initialState = {
  products: [],
  userId: null,
  loaded: false,
};

const whislist = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_WHISLIST:
      return { ...state, ...action.products, ...{ loaded: action.loaded } };
    case types.ADD_TO_WHISLIST:
      return {
        ...state,
        ...{ products: state.products.concat(action.product), userId: action.userId },
      };
    case types.REMOVE_FROM_WHISLIST:
      return {
        ...state,
        products: state.products.filter(prod => prod.productId !== action.productId),
      };
    default:
      return state;
  }
};

export default whislist;
