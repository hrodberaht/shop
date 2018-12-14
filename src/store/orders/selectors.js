import filter from 'lodash/filter';

export const getOrders = ({ orders }) => orders.orders;
export const getLoadedStatus = ({ orders }) => orders.loaded;
export const getOrdersFiltered = ({ orders }, ownProps) => {
  if (ownProps === 'all') return orders.orders;
  return filter(orders.orders, { status: ownProps });
};
