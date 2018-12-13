import fetchMock from 'fetch-mock/es5/client';
import * as actions from '../actionCreators';
import * as types from '../types';

describe('Charts actionCreators', () => {
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

  it(`should create ${types.CHART_ERRORS}`, () => {
    const payload = [];
    const expectedAction = {
      type: types.CHART_ERRORS,
      payload,
    };
    expect(actions.chartsErrors(payload)).toEqual(expectedAction);
  });
  it(`should call action with type ${
    types.CHART_ERRORS
  }`, async () => {
    const dispatch = jest.fn();
    fetchMock.get('end:orders?id=1234', { throws: Error });
    await actions.fetchSoldProducts(1234)(dispatch);

    expect(dispatch.mock.calls[0][0].type).toEqual(
      types.CHART_ERRORS,
    );
  });
  it(`should call action with type ${
    types.SOLD_PRODUCTS
  }`, async () => {
    const dispatch = jest.fn();
    fetchMock.get('end:orders?id=1234', {
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

    expect(dispatch.mock.calls[0][0].type).toEqual(
      types.SOLD_PRODUCTS,
    );
  });
});
