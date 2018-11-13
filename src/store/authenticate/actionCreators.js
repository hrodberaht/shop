import * as types from './types';
import config from '../../config/config';

const loginSuccess = (token, user) => ({
  type: types.LOGIN_SUCCESS,
  isAuth: true,
  token,
  user,
});

const loginFail = error => ({
  type: types.LOGIN_FAIL,
  isAuth: false,
  error,
});

export const logoutSuccess = () => ({
  type: types.LOGOUT,
  isAuth: false,
  token: null,
});

export const clearLoginErrors = () => ({
  type: types.CLEAR_ERRORS,
  error: null,
});

export const login = (email, password) => dispatch => fetch(`${config.url}login`, {
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
      dispatch(loginSuccess(res.token, res.user));
    }
  })
  .catch(() => {
    dispatch(loginFail('Sorry server is down'));
  });
