import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock/es5/client';

import {
  fetchProducts, addProduct, removeProduct, updateProduct,
} from '../actionCreator';
import * as types from '../types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  const url = 'http://localhost:3004/';
  afterEach(() => {
    fetchMock.restore();
  });
  it('call fetch succes action type when fetch data succes', () => {
    fetchMock.get(`${url}products`, {
      headers: { 'content-type': 'application/json' },
      body: {
        products: [],
      },
    });

    const expectedActionType = { type: types.FETCH_PRODUCTS };
    const store = mockStore();

    return store.dispatch(fetchProducts()).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });

  it('call product error action type when fetch data fail', () => {
    fetchMock.get(`${url}products`, { throws: Error });

    const expectedActionType = { type: types.PRODUCTS_ERROR };
    const store = mockStore();

    return store.dispatch(fetchProducts()).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });

  it('call add product succes action type when fetch data succes', () => {
    fetchMock.post(`${url}products`, {
      headers: { 'content-type': 'application/json' },
      body: {
        products: [],
      },
    });

    const expectedActionType = { type: types.ADD_PRODUCT };
    const store = mockStore();

    return store.dispatch(addProduct()).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });
  it('call remove product action type when fetch data succes', () => {
    fetchMock.put(`${url}products/1234`, {
      headers: { 'content-type': 'application/json' },
      body: {
        products: [],
      },
    });

    const expectedActionType = { type: types.REMOVE_PRODUCT };
    const store = mockStore();

    return store.dispatch(removeProduct('1234')).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });
  it('call update product action type when fetch data succes', () => {
    fetchMock.post(`${url}product/1234`, {
      headers: { 'content-type': 'application/json' },
      body: {
        products: [],
      },
    });

    const expectedActionType = { type: types.UDATE_PRODUCT };
    const store = mockStore();

    return store.dispatch(updateProduct({ id: '1234' })).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });
});
