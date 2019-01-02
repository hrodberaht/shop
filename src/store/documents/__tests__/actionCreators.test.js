import * as types from '../types';
import * as actions from '../actionCreators';

describe('documents action creators', () => {
  it(`should create action ${types.ADD_INVOICE}`, () => {
    expect(actions.addInvoicesSuccess('test')).toEqual({
      type: types.ADD_INVOICE,
      payload: 'test',
    });
  });
});
