const createDataForSoldChart = (data) => {
  const productsData = [];
  data.forEach(order => order.productsOrder.forEach((product) => {
    if (productsData.length === 0) {
      productsData.push({
        ...product,
        pcsOrder: +product.pcsOrder,
      });
    }

    const findedProduct = productsData.find(
      productItem => productItem.productId === product.productId,
    );

    if (findedProduct) {
      findedProduct.pcsOrder += +product.pcsOrder;
      findedProduct.totalPrice += +product.totalPrice;

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
