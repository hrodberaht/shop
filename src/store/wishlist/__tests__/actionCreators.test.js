import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock/es5/client';

import * as types from '../types';
import config from '../../../config/config';
import { fetchWishlist, addToWishlist, removeProductWishlist } from '../actionCerators';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  const url = `${config.url}wishlists`;
  afterEach(() => {
    fetchMock.restore();
  });
  it('call fetch success action type when fetch data success', () => {
    fetchMock.get(url, {
      headers: { 'content-type': 'application/json' },
      body: [],
    });

    const expectedActionType = { type: types.FETCH_WISHLIST };
    const store = mockStore();

    return store.dispatch(fetchWishlist()).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });

  it('call ADD_TO_WISHLIST action type when addToWishlist', () => {
    fetchMock.post(url, {
      headers: { 'content-type': 'application/json' },
      body: [],
    });

    const expectedActionType = { type: types.ADD_TO_WISHLIST };
    const store = mockStore();

    return store.dispatch(addToWishlist()).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });
  it('call remove product action type when fetch data success', () => {
    fetchMock.delete(url, {
      headers: { 'content-type': 'application/json' },
      body: {},
    });

    const expectedActionType = { type: types.REMOVE_FROM_WISHLIST };
    const store = mockStore();

    return store.dispatch(removeProductWishlist()).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });

  it('call ERROR_WISHLIST when fetch fail', () => {
    fetchMock.get(url, { throws: Error });

    const expectedActionType = { type: types.ERROR_WISHLIST };
    const store = mockStore();

    return store.dispatch(fetchWishlist()).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });
});
