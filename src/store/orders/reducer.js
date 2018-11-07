import * as types from './types';

const initalState = {
  orders: [],
  loaded: false,
  errors: null,
};

const orders = (state = initalState, action) => {
  switch (action.type) {
    case types.FETCH_ORDERS_SUCCES:
      return { ...state, ...{ orders: action.orders, loaded: action.loaded } };
    case types.FETCH_ORDERS_ERROR:
      return { ...state, ...{ errors: action.errors } };
    case types.ADD_ORDER_ERROR:
      return { ...state, ...{ errors: action.errors } };
    case types.ADD_ORDER_SUCCES:
      return { ...state, orders: state.orders.concat(action.order) };
    case types.CHANGE_STATUS:
      return {
        ...state,
        orders: state.orders.map(
          order => (order.id === action.orderId ? { ...order, status: action.status } : order),
        ),
      };
    default:
      return state;
  }
};

export default orders;
