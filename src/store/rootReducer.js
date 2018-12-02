import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authenticate from './authenticate/reducer';
import products from './products/reducer';
import cart from './cart/reducer';
import orders from './orders/reducer';
import wishlist from './wishlist/reducer';
import navigation from './navigation/reducer';

import * as types from './authenticate/types';

const appReducer = combineReducers({
  authenticate,
  products,
  cart,
  orders,
  wishlist,
  navigation,
  form: formReducer,
});

const rootReducer = (state, action) => {
  if (action.type === types.LOGOUT) {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
