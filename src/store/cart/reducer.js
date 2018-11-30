import * as types from './types';

export const initialState = {
  productsInCart: [],
  list: [],
  byId: {},
  meta: {
    loaded: false,
    errors: [],
  },
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_CART: {
      const {
        payload,
        payload: { id, productId },
      } = action;
      return {
        ...state,
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
        ...state,
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
      state.byId[id] = {
        ...state.byId[id],
        ...payload,
      };
      return { ...state };
    }

    case types.ERRORS_IN_CART: {
      state.meta.errors = [...state.meta.errors, action.payload];
      return { ...state };
    }
    case types.CLEAR_CART:
      return initialState;
    default:
      return state;
  }
};

export default cart;
