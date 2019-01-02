import * as types from './types';

export const initialState = {
  invoices: [],
};

const invoices = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_INVOICE:
      return { ...state, invoices: [...state.invoices, action.payload] };
    default:
      return state;
  }
};

export default invoices;
