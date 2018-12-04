import * as types from './types';

export const initialState = {
  soldProductsList: {
    list: [],
    byId: {},
  },
};

const charts = (state = initialState, action) => {
  switch (action.type) {
    case types.SOLD_PRODUCTS: {
      return {
        ...state,
        soldProductsList: {
          list: action.payload.map(product => product.productId),
          byId: action.payload.reduce(
            (byId, product) => ({ ...byId, [product.productId]: product }),
            {},
          ),
        },
      };
    }
    default:
      return { ...state };
  }
};

export default charts;
