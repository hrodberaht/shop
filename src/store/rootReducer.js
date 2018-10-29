import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth/reducer';
import products from './products/reducer';
import cart from './cart/reducer';

const rootReducer = combineReducers({
  auth,
  products,
  cart,
  form: formReducer,
});

export default rootReducer;
