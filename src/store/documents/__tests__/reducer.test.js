import reducer, { initialState } from '../reducer';
import * as actions from '../actionCreators';

describe('invoices reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return state with added invoice', () => {
    expect(reducer({ invoices: ['invoice1'] }, actions.addInvoicesSuccess('invoice'))).toEqual({
      invoices: ['invoice1', 'invoice'],
    });
  });
});
