import * as types from './types';

const initialState = {
  products: [],
  userId: null,
};

const whislist = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_WHISLIST:
      return {
        ...state,
        ...{ products: state.products.concat(action.product), userId: action.userId },
      };
    case types.REMOVE_FROM_WHISLIST:
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

export default whislist;
