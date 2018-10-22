import * as types from './types';

const initialState = {
  auth: false,
  error: null,
  token: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return { ...state, ...{ auth: action.isAuth, error: action.error, token: action.token } };
    case types.LOGOUT:
      return action.isAuth;
    default:
      return state;
  }
};

export default auth;
