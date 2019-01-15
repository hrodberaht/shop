const validate = values => {
  const errors = {};
  if (!values.company) errors.company = 'Required';
  if (!values.date) errors.date = 'Required';
  if (!values.number) errors.number = 'Required';
  if (!values.total) errors.total = 'Required';

  const productsArrayErrors = [];
  if (!values.products) {
    errors.products = { _error: 'At least one product must be entered' };
  } else {
    const productErrors = {};
    values.products.forEach((product, productIndex) => {
      if (!product.ean) {
        productErrors.ean = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }

      if (!product.name) {
        productErrors.name = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }

      if (!product.pcs) {
        productErrors.pcs = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }

      if (!product.netPrice) {
        productErrors.netPrice = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }

      if (!product.vat) {
        productErrors.vat = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }

      if (!product.grossPrice) {
        productErrors.grossPrice = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }
    });

    errors.products = productsArrayErrors;
  }
  return errors;
};

export default validate;
