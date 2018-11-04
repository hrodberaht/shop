import * as selector from '../selectors';

const state = {
  orders: {
    orders: [
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
    ],
    loaded: false,
  },
};
describe('Orders selectors', () => {
  it('should return orders', () => {
    expect(selector.getOrders(state)).toEqual(state.orders.orders);
  });
  it('should return loaded status', () => {
    expect(selector.getLoadedStatus(state)).toEqual(state.orders.loaded);
  });
});
