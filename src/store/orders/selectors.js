import applayFiletrs from '../../shared/applayFilters';

export const getOrders = ({ orders }) => orders.orders;
export const getLoadedStatus = ({ orders }) => orders.loaded;
export const getOrdersFiltered = ({ orders: { orders } }, filterValues) => applayFiletrs(orders, filterValues);
