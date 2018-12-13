const createDataForSoldChart = (data) => {
  const productsData = [];
  data.forEach(order => order.productsOrder.forEach((product) => {
    if (productsData.length === 0) {
      productsData.push({
        ...product,
        pcsOrder: +product.pcsOrder,
      });
    }

    const foundProduct = productsData.find(
      productItem => productItem.productId === product.productId,
    );

    if (foundProduct) {
      foundProduct.pcsOrder += +product.pcsOrder;
      foundProduct.totalPrice += +product.totalPrice;

      return productsData;
    }

    return productsData.push({
      ...product,
      pcsOrder: +product.pcsOrder,
    });
  }));

  return productsData;
};

export default createDataForSoldChart;
