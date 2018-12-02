export const getChartsDataSoldProducts = ({ charts }) => {
  const { list, byId } = charts.soldProductsList;
  return list.map(id => ({
    name: byId[id].name,
    y: byId[id].pcsOrder,
  }));
};
