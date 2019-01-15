const searchProductByEan = (ean, allProducts) => {
  const found = allProducts.find(product => ean === product.id);
  return found ? found.name : null;
};

export default searchProductByEan;
