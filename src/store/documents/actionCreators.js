import * as types from './types';

export const addInvoicesSuccess = payload => ({
  type: types.ADD_INVOICE,
  payload,
});

export const addInvoicesFail = payload => ({
  type: types.ADD_INVOICE,
  payload,
});
