import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock/es5/client';

import * as actions from '../actionCreators';
import * as types from '../types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cart actions', () => {
  const url = 'http://localhost:3004/orders';
  afterEach(() => {
    fetchMock.restore();
  });
  it('call fetch success action type when fetch data success', () => {
    fetchMock.get(`${url}?id=1234`, {
      headers: { 'content-type': 'application/json' },
      body: {
        orders: [],
      },
    });

    const expectedActionType = { type: types.FETCH_ORDERS_SUCCESS };
    const store = mockStore();

    return store.dispatch(actions.fetchOrders('1234')).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });

  it('call fetch error action type when fetch data fail', () => {
    fetchMock.get(`${url}?id=1234`, { throws: Error });

    const expectedActionType = { type: types.FETCH_ORDERS_ERROR };
    const store = mockStore();

    return store.dispatch(actions.fetchOrders('1234')).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });

  it('call action add order to db', () => {
    fetchMock.post('http://localhost:3004/orders', {
      headers: { 'content-type': 'application/json' },
      body: {
        orders: [],
      },
    });

    const expectedActionType = { type: types.ADD_ORDER_SUCCESS };
    const store = mockStore();

    return store.dispatch(actions.addOrderToDB()).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });

  it('call change orders status', async () => {
    const dispatch = jest.fn();

    fetchMock.put('end:/1234', {
      headers: { 'content-type': 'application/json' },
      body: {
        message: 'ok',
      },
    });

    await actions.fetchChangeOrderStatus('1234')(dispatch);
    expect(dispatch.mock.calls[0][0].type).toEqual(types.CHANGE_STATUS);
  });
});
