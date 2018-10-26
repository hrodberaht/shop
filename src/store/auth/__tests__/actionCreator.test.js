import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock/es5/client';

import * as actions from '../actionCreator';
import * as types from '../types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  const url = 'http://localhost:3004/';
  afterEach(() => {
    fetchMock.restore();
  });
  it('should create an action login succes', () => {
    const token = '1234';
    const expectedAction = {
      type: types.LOGIN_SUCCES,
      isAuth: true,
      token,
    };
    expect(actions.loginSucces(token)).toEqual(expectedAction);
  });

  it('should create an action login fail', () => {
    const error = 'error';
    const expectedAction = {
      type: types.LOGIN_FAIL,
      isAuth: false,
      error,
    };
    expect(actions.loginFail(error)).toEqual(expectedAction);
  });

  it('should create an action logout', () => {
    const expectedAction = {
      type: types.LOGOUT,
      isAuth: false,
      token: null,
    };
    expect(actions.logout()).toEqual(expectedAction);
  });

  it('call login succes action type wehen autenthicate', () => {
    fetchMock.post(url, {
      headers: { 'content-type': 'application/json' },
      body: { message: 'auth' },
    });

    const expectedActionType = { type: types.LOGIN_SUCCES };
    const store = mockStore();

    return store.dispatch(actions.login()).then(() => {
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

    return store.dispatch(actions.login()).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });
});
