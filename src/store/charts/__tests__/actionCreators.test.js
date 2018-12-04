import * as actions from '../actionCreators';
import * as types from '../types';

describe('Charts actionCreators', () => {
  it('should create SOLD_PRODUCTS', () => {
    const payload = [];
    const expectedAction = {
      type: types.SOLD_PRODUCTS,
      payload,
    };
    expect(actions.soldProducts(payload)).toEqual(expectedAction);
  });
});
