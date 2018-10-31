import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth/reducer';
import products from './products/reducer';
import cart from './cart/reducer';
import orders from './orders/reducer';

const rootReducer = combineReducers({
  auth,
  products,
  cart,
  orders,
  form: formReducer,
});

export default rootReducer;
