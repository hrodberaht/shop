import * as types from './types';

const cart = (state = [], action) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      return state.concat(action.product);
    case types.REMOVE_FROM_CART:
      return state.filter(prod => prod.id !== action.id);
    case types.CLEAR_CART:
      return action.empty;
    default:
      return state;
  }
};

export default cart;
