import * as types from './types';
import config from '../../config/config';

export const loginSucces = token => ({
  type: types.LOGIN_SUCCES,
  isAuth: true,
  token,
});

export const loginFail = error => ({
  type: types.LOGIN_FAIL,
  isAuth: false,
  error,
});

export const logout = () => ({
  type: types.LOGOUT,
  token: null,
  isAuth: false,
});

export const login = (email, password) => dispatch => fetch(config.url, {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
  .then(res => res.json())
  .then((res) => {
    if (res.error) {
      dispatch(loginFail(res.error));
    }
    if (res.message) {
      dispatch(loginSucces(res.token));
    }
  });
