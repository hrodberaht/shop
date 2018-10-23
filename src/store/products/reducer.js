import * as types from './types';

const initialState = [
  {
    id: 'product-1',
    type: 'Printer',
    name: 'ZX3',
    price: '400',
    inStock: '30',
  },
  {
    id: 'product-2',
    type: 'Printer',
    name: 'ZX5',
    price: '600',
    inStock: '5',
  },
  {
    id: 'product-3',
    type: 'Printer',
    name: 'ZX1',
    price: '200',
    inStock: '50',
  },
  {
    id: 'product-4',
    type: 'Fax',
    name: 'F2',
    price: '45',
    inStock: '0',
  },
  {
    id: 'product-5',
    type: 'Fax',
    name: 'F4',
    price: '50',
    inStock: '180',
  },
];

const products = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS:
      return { ...state, ...action.products };
    default:
      return state;
  }
};

export default products;
