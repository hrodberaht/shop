import reducer, { initialState } from '../reducer';
import * as actions from '../actionCreators';

describe('Charts reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SOLD_PRODUCTS', () => {
    const payload = [
      {
        id: 'orderPosition-1',
        productId: 'product',
        name: 'ZX5',
        pcsOrder: 15,
        price: 600,
        totalPrice: 9000,
      },
    ];
    const updateState = {
      soldProductsList: {
        list: ['product'],
        byId: {
          product: {
            id: 'orderPosition-1',
            productId: 'product',
            name: 'ZX5',
            pcsOrder: 15,
            price: 600,
            totalPrice: 9000,
          },
        },
      },
      meta: {
        errors: [],
      },
    };
    expect(reducer(initialState, actions.soldProducts(payload))).toEqual(updateState);
  });
});
