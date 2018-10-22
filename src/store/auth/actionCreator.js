import * as types from './types';

const url = 'http://localhost:3004/';

export const loginSucces = () => ({
  type: types.LOGIN,
  isAuth: true,
});

export const loginFail = error => ({
  type: types.LOGIN,
  isAuth: false,
  error,
});

export const logout = () => ({
  type: types.LOGOUT,
  isAuth: false,
});

export const login = (email, password) => dispatch => fetch(url, {
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
      dispatch(loginSucces());
    }
  });
