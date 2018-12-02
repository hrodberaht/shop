import * as types from './types';

const charts = (state, action) => {
  switch (action.type) {
    case types.SOLD_PRODUCTS:
      return { ...state, sold: action.payload };
    default:
      return { ...state };
  }
};

export default charts;
