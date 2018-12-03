import * as types from './types';

const initialState = {
  isSidebarVisible: true,
};

const navigation = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_SIDEBAR:
      return { ...state, isSidebarVisible: !state.isSidebarVisible };
    default:
      return state;
  }
};

export default navigation;
