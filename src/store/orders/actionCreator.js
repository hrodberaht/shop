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

const addOrderError = error => ({
  type: types.ADD_ORDER_ERROR,
  error,
});

export const changeOrderStatus = orderId => ({
  type: types.CHANGE_STATUS,
  orderId,
  status: 'realised',
});

export const fetchOrders = (userId, token) => (dispatch) => {
  fetch(`${config.url}orders?id=${userId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify({ userId }),
  })
    .then(res => res.json())
    .then((orders) => {
      dispatch(fetchOrdersSucces(orders));
    })
    .catch(error => dispatch(fetchOrdersError(error)));
};

export const addOrderToDB = (order, token) => (dispatch) => {
  fetch(`${config.url}orders`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  }).catch(error => dispatch(addOrderError(error)));
};
