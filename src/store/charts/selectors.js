import { createSelectorCreator, defaultMemoize } from 'reselect';
import { isEqual } from 'lodash';

const getSoldList = ({ charts }) => charts.soldProductsList.list;
const getSoldProducts = ({ charts }) => charts.soldProductsList.byId;

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

export const getChartsDataSoldProducts = createDeepEqualSelector(
  [getSoldList, getSoldProducts],
  (list, products) => list.map(id => ({
    name: products[id].name,
    y: products[id].pcsOrder,
  })),
);

export default getChartsDataSoldProducts;
