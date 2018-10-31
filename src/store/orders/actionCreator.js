import * as types from './types';

export const fetchOrdersSucces = orders => ({
  type: types.FETCH_ORDERS_SUCCES,
  orders,
  loaded: true,
});

export const fetchOrdersError = error => ({
  type: types.FETCH_ORDERS_ERROR,
  error,
  loaded: false,
});

export const changeOrderStatus = orderId => ({
  type: types.CHANGE_STATUS,
  orderId,
  status: 'realised',
});
