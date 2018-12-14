import { createSelector } from 'reselect';
import applayFilters from '../../shared/applayFilters';

export const getOrders = ({ orders }) => orders.orders;
export const getLoadedStatus = ({ orders }) => orders.loaded;
export const getOrdersFilterValues = (state, filterValues) => filterValues;

export const getOrdersFiltered = createSelector(
  getOrders,
  getOrdersFilterValues,
  (orders, filterValues) => applayFilters(orders, filterValues),
);
