import * as types from './types';

const cart = (state = [], action) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      return state.concat(action.product);
    case types.CLEAR_CART:
      return action.empty;
    default:
      return state;
  }
};

export default cart;
