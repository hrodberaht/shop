import * as types from './types';
import config from '../../config/config';

const loginSucces = token => ({
  type: types.LOGIN_SUCCES,
  isAuth: true,
  token,
});

const loginFail = error => ({
  type: types.LOGIN_FAIL,
  isAuth: false,
  error,
});

export const logoutSucces = () => ({
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
      dispatch(loginSucces(res.token));
    }
  })
  .catch(() => {
    dispatch(loginFail('Sorry server is down'));
  });
