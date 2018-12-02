import reducer, { initialState } from '../reducer';
import * as action from '../actionCreators';

describe('cart reducer', () => {
  const product = {
    id: '1',
    productId: '2',
    name: 'fx',
    price: 400,
    pcs: 2,
    totalPrice: 800,
  };

  const updateProduct = {
    id: '1',
    productId: '2',
    name: 'fx',
    price: 400,
    pcs: 4,
    totalPrice: 1600,
  };

  const error = 'error';

  const stateAfterAddProduct = {
    byId: {
      1: {
        id: '1',
        productId: '2',
        name: 'fx',
        price: 400,
        pcs: 2,
        totalPrice: 800,
      },
    },
    list: ['1'],
    productsInCart: ['2'],
    meta: {
      loaded: false,
      errors: [],
    },
  };

  const stateAfterUpdateProduct = {
    byId: {
      1: {
        id: '1',
        productId: '2',
        name: 'fx',
        price: 400,
        pcs: 4,
        totalPrice: 1600,
      },
    },
    list: ['1'],
    productsInCart: ['2'],
    meta: {
      loaded: false,
      errors: [],
    },
  };

  const stateAfterError = {
    byId: {},
    list: [],
    productsInCart: [],
    meta: {
      loaded: false,
      errors: [error],
    },
  };
  it('should return initial state', () => {
    expect(reducer(undefined, initialState)).toEqual(initialState);
  });

  it('should handle ADD_TO_CART', () => {
    expect(reducer(initialState, action.addProductToCartSuccess(product))).toEqual(
      stateAfterAddProduct,
    );
  });
  it('should handle REMOVE_FROM_CART', () => {
    expect(reducer(stateAfterAddProduct, action.removeFromCart(product))).toEqual(initialState);
  });

  it('should handle UPDATE_IN_CART', () => {
    expect(reducer(stateAfterAddProduct, action.updateProductInCartSuccess(updateProduct))).toEqual(
      stateAfterUpdateProduct,
    );
  });

  it('should handle ERRORS_IN_CART', () => {
    expect(reducer(initialState, action.errorInCart(error))).toEqual(stateAfterError);
  });

  it('should handle CLEAR_CART', () => {
    expect(reducer(stateAfterAddProduct, action.clearCart())).toEqual(initialState);
  });
});
