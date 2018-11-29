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
    const {
      error, message, token, user,
    } = res;
    if (error) {
      dispatch(loginFail(error));
    }
    if (message) {
      dispatch(loginSuccess(token, user));
      localStorage.setItem('token', token);
    }
  })
  .catch(() => {
    dispatch(loginFail('Sorry server is down'));
  });
