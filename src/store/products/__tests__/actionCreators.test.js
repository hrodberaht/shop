import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock/es5/client';
import * as action from '../actionCreators';
import * as types from '../types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  const url = 'http://localhost:3004/';
  const graphqlUrl = process.env.REACT_APP_GRAPHQL_API_URI;
  afterEach(() => {
    fetchMock.restore();
  });
  it('call fetch success action type when fetch data success', async () => {
    const dispatch = jest.fn();

    fetchMock.post(`${graphqlUrl}`, {
      headers: { 'content-type': 'application/json' },
      body: {
        data: {
          products: [],
        },
      },
    });
    await action.fetchProducts()(dispatch);
    expect(dispatch.mock.calls[0][0].type).toEqual(types.FETCH_PRODUCTS);
  });

  it('call product error action type when fetch data fail', async () => {
    const dispatch = jest.fn();

    fetchMock.post(`${graphqlUrl}`, { throws: Error });
    await action.fetchProducts()(dispatch);
    expect(dispatch.mock.calls[0][0].type).toEqual(types.PRODUCTS_ERROR);
  });

  it('call add product success action type when fetch data success', () => {
    fetchMock.post(`${url}products`, {
      headers: { 'content-type': 'application/json' },
      body: {
        products: [],
      },
    });

    const expectedActionType = { type: types.ADD_PRODUCT };
    const store = mockStore();

    return store.dispatch(action.addProduct()).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });
  it('call remove product action type when fetch data success', () => {
    fetchMock.put(`${url}products/1234`, {
      headers: { 'content-type': 'application/json' },
      body: {
        products: [],
      },
    });

    const expectedActionType = { type: types.REMOVE_PRODUCT };
    const store = mockStore();

    return store.dispatch(action.removeProduct('1234')).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });
  it('call update product action type when fetch data success', () => {
    fetchMock.post(`${url}product/1234`, {
      headers: { 'content-type': 'application/json' },
      body: {
        products: [],
      },
    });

    const expectedActionType = { type: types.UPDATE_PRODUCT };
    const store = mockStore();

    return store.dispatch(action.updateProduct({ id: '1234' })).then(() => {
      expect(store.getActions()[0]).toEqual(expect.objectContaining(expectedActionType));
    });
  });
  it('call update product action type when undeletedProduct ', async () => {
    const dispatch = jest.fn();
    fetchMock.put('end:/1234', {
      headers: { 'content-type': 'application/json' },
      body: {
        product: {},
      },
    });

    await action.undeleteProductInDb('1234')(dispatch);

    expect(dispatch.mock.calls[0][0].type).toEqual(types.UPDATE_PRODUCT);
  });
});
