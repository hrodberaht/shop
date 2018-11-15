import * as types from './types';

const initialState = {
  productsInCart: [],
  list: [],
  byId: {},
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_CART: {
      const {
        payload,
        payload: { id, productId },
      } = action;
      return {
        productsInCart: [...state.productsInCart, productId],
        list: [...state.list, id],
        byId: { ...state.byId, [id]: payload },
      };
    }
    case types.REMOVE_FROM_CART: {
      const {
        payload: { id, productId },
      } = action;
      delete state.byId[id];
      return {
        productsInCart: state.productsInCart.filter(item => item !== productId),
        list: state.list.filter(item => item !== id),
        byId: state.byId,
      };
    }
    case types.UPDATE_IN_CART: {
      const {
        payload,
        payload: { id },
      } = action;
      return { ...state.byId, [id]: payload };
    }
    case types.CLEAR_CART:
      return action.empty;
    default:
      return state;
  }
};

export default cart;
