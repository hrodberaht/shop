import * as types from './types';

// auto login use only in dev
const initialState = {
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

// Corrects values for state in production
// const initialState = {
//   auth: false,
//   error: null,
//   token: null,
//   user: {},
// };

const authenticate = (state = initialState, action) => {
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
