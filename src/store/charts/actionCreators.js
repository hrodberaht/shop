import * as types from './types';
import dataFetcher from '../../shared/dataFetcher';
import { getAuthUserId } from '../authenticate/selectors';

export const soldProducts = payload => ({
  type: types.SOLD_PRODUCTS,
  payload,
});

export const fetchSoldProducts = () => (dispatch, getState) => {
  const id = getAuthUserId(getState());
  dataFetcher(`orders?id=${id}`, 'get')
    .then((orders) => {
      console.log(orders);
      dispatch(soldProducts(orders));
    })
    .catch(error => console.log(error));
};
