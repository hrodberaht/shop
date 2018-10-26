import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock/es5/client';

import fetchProducts from '../actionCreator';
import * as types from '../types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  const url = 'http://localhost:3004/products';
  afterEach(() => {
    fetchMock.restore();
  });
  it('call fetch succes action type when fetch data succes', () => {
    fetchMock.get(url, {
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

  it('call fetch Error action type when fetch data fail', () => {
    fetchMock.get(url, { throws: Error });

    const expectedActionType = { type: types.FETCH_PRODUCTS_ERROR };
    const store = mockStore();

    return store.dispatch(fetchProducts()).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });
});
