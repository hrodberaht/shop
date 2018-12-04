import fetchMock from 'fetch-mock/es5/client';
import * as actions from '../actionCreators';
import * as types from '../types';
import config from '../../../config/config';

describe('Charts actionCreators', () => {
  const { url } = config;
  afterEach(() => {
    fetchMock.restore();
  });
  it('should create SOLD_PRODUCTS', () => {
    const payload = [];
    const expectedAction = {
      type: types.SOLD_PRODUCTS,
      payload,
    };
    expect(actions.soldProducts(payload)).toEqual(expectedAction);
  });

  it('should call action with type SOLD_PRODUCTS', async () => {
    const dispatch = jest.fn();
    fetchMock.get(`${url}orders?id=1234`, {
      headers: { 'content-type': 'application/json' },
      body: [
        {
          productsOrder: [
            {
              id: 'orderPosition-1',
              productId: 'product-2',
              name: 'ZX5',
              pcsOrder: '3',
              price: 600,
              totalPrice: 1800,
            },
          ],
        },
      ],
    });
    await actions.fetchSoldProducts(1234)(dispatch);

    expect(dispatch.mock.calls[0][0].type).toEqual(types.SOLD_PRODUCTS);
  });
});
