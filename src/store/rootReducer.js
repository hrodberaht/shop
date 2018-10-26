import { combineReducers } from 'redux';
import auth from './auth/reducer';
import products from './products/reducer';

const rootReducer = combineReducers({
  auth,
  products,
});

export default rootReducer;
