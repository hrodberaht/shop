import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock/es5/client';

import { fetchOrders, addOrderToDB, fetchChangeOrderStatus } from '../actionCreator';
import * as types from '../types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cart actions', () => {
  const url = 'http://localhost:3004/orders';
  afterEach(() => {
    fetchMock.restore();
  });
  it('call fetch succes action type when fetch data succes', () => {
    fetchMock.get(`${url}?id=1234`, {
      headers: { 'content-type': 'application/json' },
      body: {
        orders: [],
      },
    });

    const expectedActionType = { type: types.FETCH_ORDERS_SUCCES };
    const store = mockStore();

    return store.dispatch(fetchOrders('1234')).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });

  it('call fetch error action type when fetch data fail', () => {
    fetchMock.get(`${url}?id=1234`, { throws: Error });

    const expectedActionType = { type: types.FETCH_ORDERS_ERROR };
    const store = mockStore();

    return store.dispatch(fetchOrders('1234')).then(() => {
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

    const expectedActionType = { type: types.ADD_ORDER_SUCCES };
    const store = mockStore();

    return store.dispatch(addOrderToDB()).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });

  it('call change orders status', () => {
    fetchMock.put(`${url}/1234`, {
      headers: { 'content-type': 'application/json' },
      body: {
        message: 'ok',
      },
    });

    const expectedActionType = { type: types.CHANGE_STATUS };
    const store = mockStore();

    return store.dispatch(fetchChangeOrderStatus('1234')).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });
});
