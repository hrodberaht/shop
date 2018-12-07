import { createSelector } from 'reselect';

const getSoldList = ({ charts }) => charts.soldProductsList.list;
const getSoldProducts = ({ charts }) => charts.soldProductsList.byId;

export const getChartsDataSoldProducts = createSelector(
  getSoldList,
  getSoldProducts,
  (list, products) => list.map(id => ({
    name: products[id].name,
    y: products[id].pcsOrder,
  })),
);

export default getChartsDataSoldProducts;
