import orders from '../reducer';
import * as types from '../types';

describe('products reducer', () => {
  const order = [
    {
      userId: 'user-4',
      person: 'Mark Spencer',
      totalPrice: 200,
      status: 'in-progress',
      date: '2018-11-02T18:00:19.718Z',
      companyId: '',
      orderPositionIds: ['ae1wQ-jte'],
      id: 'kgyrHJu',
      productsOrder: [
        {
          productId: 'product-3',
          name: 'ZX1',
          price: 200,
          pcsOrder: 1,
          totalPrice: 200,
          id: 'ae1wQ-jte',
        },
      ],
    },
  ];
  it('should return the initial state', () => {
    expect(orders(undefined, {})).toEqual({
      orders: [],
      loaded: false,
      errors: null,
    });
  });
  it('should handle FETCH_ORDERS_SUCCESS', () => {
    expect(
      orders(
        {},
        {
          type: types.FETCH_ORDERS_SUCCESS,
          orders: [],
          loaded: true,
        },
      ),
    ).toEqual({
      orders: [],
      loaded: true,
    });
  });
  it('should handle FETCH_ORDERS_ERROR', () => {
    expect(
      orders(
        {},
        {
          type: types.FETCH_ORDERS_ERROR,
          errors: 'Somthing went wrong',
        },
      ),
    ).toEqual({
      errors: 'Somthing went wrong',
    });
  });
  it('should handle CHANGE_STATUS', () => {
    expect(
      orders(
        { orders: order },
        {
          type: types.CHANGE_STATUS,
          orderId: 'kgyrHJu',
          status: 'realized',
        },
      ).orders[0].status,
    ).toEqual('realized');
  });
});
