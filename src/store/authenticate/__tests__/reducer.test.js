import auth from '../reducer';
import * as types from '../types';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(auth(undefined, {})).toEqual({
      auth: false,
      error: null,
      token: null,
      user: {},
    });
  });
  it('should handle LOGIN_SUCCESS', () => {
    expect(
      auth([], {
        type: types.LOGIN_SUCCESS,
        isAuth: true,
        token: '1234',
      }),
    ).toEqual({
      auth: true,
      token: '1234',
    });
  });
  it('should handle LOGIN_FAIL', () => {
    expect(
      auth([], {
        type: types.LOGIN_FAIL,
        isAuth: false,
        error: 'error',
      }),
    ).toEqual({
      auth: false,
      error: 'error',
    });
  });
  it('should handle LOGOUT', () => {
    expect(
      auth([], {
        type: types.LOGOUT,
        isAuth: false,
        token: null,
      }),
    ).toEqual({
      auth: false,
      token: null,
      user: {},
    });
  });
});
