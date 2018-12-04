import * as types from './types';

export const initialState = {
  soldProductsList: {
    list: [],
    byId: {},
  },

  meta: {
    errors: [],
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
        meta: {
          ...state.meta,
          errors: [],
        },
      };
    }
    case types.CHART_ERRORS:
      return { ...state, meta: { ...state.meta, errors: [...state.meta.errors, action.payload] } };
    default:
      return { ...state };
  }
};

export default charts;
