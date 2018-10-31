import * as types from './types';

const initalState = {
  orders: [
    {
      id: 'order-1',
      userId: 'user-2',
      orderPositionIds: [
        {
          id: 'orderPosition-1',
          productId: 'product-2',
          amount: '3',
          pricePerUnit: '600',
          totalPrice: '1800',
        },
        {
          id: 'orderPosition-2',
          productId: 'product-5',
          amount: '10',
          pricePerUnit: '50',
          totalPrice: '500',
        },
      ],
      status: 'realized',
      totalPrice: '2300',
    },
    {
      id: 'order-2',
      userId: 'user-3',
      orderPositionIds: [
        {
          id: 'orderPosition-3',
          productId: 'product-1',
          amount: '5',
          pricePerUnit: '400',
          totalPrice: '2000',
        },
      ],
      status: 'in-progress',
      totalPrice: '2000',
    },
  ],
  loaded: false,
  errors: null,
};

const orders = (state = initalState, action) => {
  switch (action.type) {
    case types.FETCH_ORDERS_SUCCES:
      return { ...state, ...action.orders };
    case types.FETCH_ORDERS_ERROR:
      return { ...state, ...action.error };
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
