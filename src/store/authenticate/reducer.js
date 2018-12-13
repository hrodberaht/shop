import * as types from './types';

const initialState = (autologin) => {
  if (autologin === '1') {
    return {
      auth: true,
      error: null,
      token: process.env.REACT_APP_TOKEN,
      user: {
        id: 'user-4',
        firstName: 'Mark',
        lastName: 'Spencer',
        role: 'admin',
        companyId: '',
      },
    };
  }

  return {
    auth: false,
    error: null,
    token: null,
    user: {},
  };
};

const authenticate = (state = initialState(process.env.REACT_APP_AUTO_LOGIN), action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        ...{
          auth: action.isAuth,
          token: action.token,
          user: action.user,
        },
      };
    case types.LOGIN_FAIL:
      return { ...state, ...{ auth: action.isAuth, error: action.error } };
    case types.LOGOUT:
      return { ...state, ...{ auth: action.isAuth, token: action.token, user: {} } };
    case types.CLEAR_ERRORS:
      return { ...state, ...{ error: null } };
    default:
      return state;
  }
};

export default authenticate;
