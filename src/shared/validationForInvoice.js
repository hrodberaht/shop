const validate = values => {
  const errors = {};
  if (!values.company) errors.company = 'Required';
  if (!values.date) errors.date = 'Required';
  if (!values.number) errors.number = 'Required';
  if (!values.total) errors.total = 'Required';

  const productsArrayErrors = [];
  if (!values.products || !values.products.length) {
    errors.products = { _error: 'At least one product must be entered' };
  } else {
    values.products.forEach((product, productIndex) => {
      const productErrors = {};
      if (!product || !product.ean) {
        productErrors.ean = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }

      if (!product || !product.name) {
        productErrors.name = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }

      if (!product || !product.pcs) {
        productErrors.pcs = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }

      if (!product || !product.netPrice) {
        productErrors.netPrice = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }

      if (!product || product.vat === undefined) {
        productErrors.vat = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }

      if (!product || !product.grossPrice) {
        productErrors.grossPrice = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }

      if (product.pcs <= 0) {
        productErrors.pcs = 'Pcs should be bigger than 0';
        productsArrayErrors[productIndex] = productErrors;
      }

      if (product.netPrice <= 0) {
        productErrors.netPrice = 'Net price should be bigger than 0';
        productsArrayErrors[productIndex] = productErrors;
      }
    });

    errors.products = productsArrayErrors;
  }
  return errors;
};

export default validate;
