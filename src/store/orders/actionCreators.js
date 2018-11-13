import * as types from './types';
import config from '../../config/config';

const fetchOrdersSucces = orders => ({
  type: types.FETCH_ORDERS_SUCCES,
  orders,
  loaded: true,
});

const fetchOrdersError = error => ({
  type: types.FETCH_ORDERS_ERROR,
  error,
  loaded: false,
});

const addOrderSucces = orders => ({
  type: types.ADD_ORDER_SUCCES,
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
  .then(orders => dispatch(fetchOrdersSucces(orders)))
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
  .then(res => dispatch(addOrderSucces(res)))
  .catch(error => dispatch(addOrderError(error)));

export const fetchChangeOrderStatus = (orderId, token) => dispatch => fetch(`${config.url}orders/${orderId}`, {
  method: 'put',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ status: 'realized' }),
})
  .then(res => res.json())
  .then((res) => {
    if (res.message) dispatch(changeOrderStatus(orderId));
  })
  .catch(error => dispatch(fetchOrdersError(error)));
