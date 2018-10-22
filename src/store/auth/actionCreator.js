import * as types from './types';

export const login = () => ({
  type: types.LOGIN,
  isAuth: true,
});

export const logout = () => ({
  type: types.LOGOUT,
  isAuth: false,
});
