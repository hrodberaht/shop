import * as types from './types';
import dataFetcher from '../../shared/dataFetcher';
import createDataForSoldChart from '../../shared/createDataForSoldChart';

export const soldProducts = payload => ({
  type: types.SOLD_PRODUCTS,
  payload,
});

export const chartsErrors = payload => ({
  type: types.CHART_ERRORS,
  payload,
});

export const fetchSoldProducts = userId => dispatch => dataFetcher(`orders?id=${userId}`, 'get')
  .then((orders) => {
    dispatch(soldProducts(createDataForSoldChart(orders)));
  })
  .catch(error => dispatch(chartsErrors(error)));
