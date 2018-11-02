export const getProductsInCart = ({ cart }) => cart;
export const getOrderPositionIds = ({ cart }) => {
  const orderPosition = [];
  cart.forEach((productInCart) => {
    orderPosition.push(productInCart.id);
  });
  return orderPosition;
};
