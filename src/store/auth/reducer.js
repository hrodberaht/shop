import * as types from './types';

const initialState = {
  auth: false,
  error: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return { ...state, ...{ auth: action.isAuth, error: action.error } };
    case types.LOGOUT:
      return action.isAuth;
    default:
      return state;
  }
};

export default auth;
