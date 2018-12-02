import * as types from './types';
import dataFetcher from '../../shared/dataFetcher';
import { getAuthUserId } from '../authenticate/selectors';

export const soldProducts = payload => ({
  type: types.SOLD_PRODUCTS,
  payload,
});

export const fetchSoldProducts = () => (dispatch, getState) => {
  const id = getAuthUserId(getState());
  dataFetcher(`orders?id=${id}`, 'get')
    .then((orders) => {
      const productsData = [];
      orders.forEach(order => order.productsOrder.forEach((product) => {
        if (productsData.length === 0) {
          productsData.push({ ...product, pcsOrder: +product.pcsOrder });
        }

        const findedProduct = productsData.find(
          productItem => productItem.productId === product.productId,
        );
        if (findedProduct) {
          findedProduct.pcsOrder += +product.pcsOrder;
          findedProduct.totalPrice += +product.totalPrice;
        } else {
          productsData.push({ ...product, pcsOrder: +product.pcsOrder });
        }
      }));

      dispatch(soldProducts(productsData));
    })
    .catch(error => console.log(error));
};
