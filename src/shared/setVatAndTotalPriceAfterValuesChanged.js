import {change} from 'redux-form';

export const countVATS = (products, vat) =>
  products
    ? products.reduce(
        (sum, product) =>
          product.vat === vat
            ? sum + (product.grossPrice - product.netPrice * product.pcs)
            : sum + 0,
        0
      )
    : 0;

export const countTotalGrossPrice = products =>
  products
    ? products.reduce(
        (sum, product) =>
          product.grossPrice ? sum + product.grossPrice : sum + 0,
        0
      )
    : 0;

export const countTotalNetPrice = products =>
  products
    ? products.reduce(
        (sum, product) =>
          product.netPrice && product.pcs
            ? sum + product.netPrice * product.pcs
            : sum + 0,
        0
      )
    : 0;

export const setVatAndTotalPriceAfterValuesChanged = (products, dispatch) => {
  dispatch(change('addInvoice', 'vat23', countVATS(products, 23)));
  dispatch(change('addInvoice', 'vat8', countVATS(products, 8)));
  dispatch(change('addInvoice', 'vat5', countVATS(products, 5)));
  dispatch(
    change(
      'addInvoice',
      'totalGrossPrice',
      countTotalGrossPrice(products)
    )
  );
  dispatch(
    change(
      'addInvoice',
      'totalNetPrice',
      countTotalNetPrice(products)
    )
  );
};