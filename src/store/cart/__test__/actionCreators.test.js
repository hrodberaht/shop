import fetchMock from 'fetch-mock/es5/client';
import * as action from '../actionCreators';
import * as types from '../types';

describe('cart actions', () => {
  const url = 'http://localhost:3004/';
  afterEach(() => {
    fetchMock.restore();
  });

  it('should create an action to ADD_TO_CART', () => {
    const payload = {};
    const expectedAction = {
      type: types.ADD_TO_CART,
      payload,
    };
    expect(action.addProductToCartSuccess(payload)).toEqual(expectedAction);
  });

  it('should call clearCart when type CLEAR_CART', () => {
    const expectedActions = {
      type: types.CLEAR_CART,
    };

    expect(action.clearCart()).toEqual(expectedActions);
  });

  it('should create an action to REMOVE_FROM_CART', () => {
    const payload = {};
    const expectedAction = {
      type: types.REMOVE_FROM_CART,
      payload,
    };
    expect(action.removeFromCart(payload)).toEqual(expectedAction);
  });

  it('should create an action to UPDATE_IN_CART', () => {
    const payload = {};
    const expectedAction = {
      type: types.UPDATE_IN_CART,
      payload,
    };
    expect(action.updateProductInCartSuccess(payload)).toEqual(expectedAction);
  });

  it('should create an action to ERRORS_IN_CART', () => {
    const payload = {};
    const expectedAction = {
      type: types.ERRORS_IN_CART,
      payload,
    };
    expect(action.errorInCart(payload)).toEqual(expectedAction);
  });

  it('updateProductInCart should call action with type UPDATE_IN_CART if response', async () => {
    const dispatch = jest.fn();
    fetchMock.put(`${url}orderPositions`, {
      headers: { 'content-type': 'application/json' },
      body: { message: 'ok' },
    });
    await action.updateProductInCart('toy', '123')(dispatch);
    expect(dispatch.mock.calls[0][0].type).toEqual(types.UPDATE_IN_CART);
  });

  it('updateProductInCart should call action with type ERRORS_IN_CART if error ', async () => {
    const dispatch = jest.fn();
    fetchMock.put(`${url}orderPositions`, { throws: Error });
    await action.updateProductInCart('toy', '123')(dispatch);
    expect(dispatch.mock.calls[0][0].type).toEqual(types.ERRORS_IN_CART);
  });

  it('addProductToCart should call action with type ADD_TO_CART if response', async () => {
    const dispatch = jest.fn();
    fetchMock.post(`${url}orderPositions`, {
      headers: { 'content-type': 'application/json' },
      body: { message: 'ok' },
    });
    await action.addProductToCart('toy', '123')(dispatch);
    expect(dispatch.mock.calls[0][0].type).toEqual(types.ADD_TO_CART);
  });
  it('addProductToCart should call action with type ERRORS_IN_CART if error', async () => {
    const dispatch = jest.fn();
    fetchMock.post(`${url}orderPositions`, { throws: Error });
    await action.addProductToCart('toy', '123')(dispatch);
    expect(dispatch.mock.calls[0][0].type).toEqual(types.ERRORS_IN_CART);
  });
});
