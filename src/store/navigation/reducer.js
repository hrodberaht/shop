import * as types from './types';

const initialState = {
  toggleSidebar: true,
};

const navigation = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_SIDEBAR:
      return { ...state, toggleSidebar: !state.toggleSidebar };
    default:
      return state;
  }
};

export default navigation;
