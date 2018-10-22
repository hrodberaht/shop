import * as types from './types';

const auth = (state = false, action) => {
  switch (action.type) {
    case types.LOGIN:
      return action.isAuth;
    case types.LOGOUT:
      return action.isAuth;
    default:
      return state;
  }
};

export default auth;
