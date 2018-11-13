import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth/reducer';
import products from './products/reducer';
import cart from './cart/reducer';
import orders from './orders/reducer';
import wishlist from './wishlist/reducer';
import * as types from './auth/types';

const appReducer = combineReducers({
  auth,
  products,
  cart,
  orders,
  wishlist,
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
