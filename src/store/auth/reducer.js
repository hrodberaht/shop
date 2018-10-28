import * as types from './types';

const initialState = {
  auth: false,
  error: null,
  token: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCES:
      return { ...state, ...{ auth: action.isAuth, token: action.token } };
    case types.LOGIN_FAIL:
      return { ...state, ...{ auth: action.isAuth, error: action.error } };
    case types.LOGOUT:
      return { ...state, ...{ auth: action.isAuth, token: action.token } };
    case types.CLEAR_ERRORS:
      return { ...state, ...{ error: null } };
    default:
      return state;
  }
};

export default auth;
