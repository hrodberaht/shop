export const getProductsInCart = ({ cart }) => cart;
export const getOrderPositionIds = ({ cart }) => cart.list;
export const getAllOrderPositionsInCart = ({ cart }) => cart.list.map(id => cart.byId[id]);
export const getIdsProductsInCart = ({ cart }) => cart.productsInCart;
