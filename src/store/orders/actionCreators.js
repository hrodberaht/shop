import * as types from './types';
import config from '../../config/config';
import dataFetcher from '../../shared/dataFetcher';

const fetchOrdersSuccess = orders => ({
  type: types.FETCH_ORDERS_SUCCESS,
  orders,
  loaded: true,
});

const fetchOrdersError = error => ({
  type: types.FETCH_ORDERS_ERROR,
  error,
  loaded: false,
});

const addOrderSuccess = orders => ({
  type: types.ADD_ORDER_SUCCESS,
  orders,
});

const addOrderError = error => ({
  type: types.ADD_ORDER_ERROR,
  error,
});

const changeOrderStatus = orderId => ({
  type: types.CHANGE_STATUS,
  orderId,
  status: 'realized',
});

export const fetchOrders = (userId, token) => dispatch => fetch(`${config.url}orders?id=${userId}`, {
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then(res => res.json())
  .then(orders => dispatch(fetchOrdersSuccess(orders)))
  .catch(error => dispatch(fetchOrdersError(error)));

export const addOrderToDB = (order, token) => dispatch => fetch(`${config.url}orders`, {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(order),
})
  .then(res => res.json())
  .then(res => dispatch(addOrderSuccess(res)))
  .catch(error => dispatch(addOrderError(error)));

export const fetchChangeOrderStatus = orderId => dispatch => dataFetcher(`orders/${orderId}`, 'PUT', { status: 'realized' })
  .then(() => dispatch(changeOrderStatus(orderId)))
  .catch(error => dispatch(fetchOrdersError(error)));
