import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock/es5/client';

import * as types from '../types';
import config from '../../../config/config';
import { fetchWhislist, addToWhisList, removeProductWhisList } from '../actionCerator';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  const url = `${config.url}whislists`;
  afterEach(() => {
    fetchMock.restore();
  });
  it('call fetch succes action type when fetch data succes', () => {
    fetchMock.get(url, {
      headers: { 'content-type': 'application/json' },
      body: [],
    });

    const expectedActionType = { type: types.FETCH_WHISLIST };
    const store = mockStore();

    return store.dispatch(fetchWhislist()).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });

  it('call ADD_TO_WHISLIST action type when addToWhisList', () => {
    fetchMock.post(url, {
      headers: { 'content-type': 'application/json' },
      body: [],
    });

    const expectedActionType = { type: types.ADD_TO_WHISLIST };
    const store = mockStore();

    return store.dispatch(addToWhisList()).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });
  it('call remove product action type when fetch data succes', () => {
    fetchMock.delete(url, {
      headers: { 'content-type': 'application/json' },
      body: {},
    });

    const expectedActionType = { type: types.REMOVE_FROM_WHISLIST };
    const store = mockStore();

    return store.dispatch(removeProductWhisList()).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });

  it('call ERROR_WHISLIST when fetch fail', () => {
    fetchMock.get(url, { throws: Error });

    const expectedActionType = { type: types.ERROR_WHISLIST };
    const store = mockStore();

    return store.dispatch(fetchWhislist()).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });
});
