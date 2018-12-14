import { createSelector } from 'reselect';
import applayFiletrs from '../../shared/applayFilters';

export const getOrders = ({ orders }) => orders.orders;
export const getLoadedStatus = ({ orders }) => orders.loaded;
export const getOrdersFilterValues = (state, filterValues) => filterValues;

export const getOrdersFiltered = createSelector(
  getOrders,
  getOrdersFilterValues,
  (orders, filterValues) => applayFiletrs(orders, filterValues),
);
