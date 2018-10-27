import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock/es5/client';

import login from '../actionCreator';
import * as types from '../types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  const url = 'http://localhost:3004/login';
  afterEach(() => {
    fetchMock.restore();
  });

  it('call login succes action type wehen autenthicate', () => {
    fetchMock.post(url, {
      headers: { 'content-type': 'application/json' },
      body: { message: 'auth' },
    });

    const expectedActionType = { type: types.LOGIN_SUCCES };
    const store = mockStore();

    return store.dispatch(login()).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });

  it('call login fail acction type wehen fail autenthicate', () => {
    fetchMock.post(url, {
      headers: { 'content-type': 'application/json' },
      body: { error: 'error' },
    });

    const expectedActionType = { type: types.LOGIN_FAIL };
    const store = mockStore();

    return store.dispatch(login()).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });
});
