import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth/reducer';
import products from './products/reducer';

const rootReducer = combineReducers({
  auth,
  products,
  form: formReducer,
});

export default rootReducer;
