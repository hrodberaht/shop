import * as selectors from '../selectors';

describe('Charts selectors', () => {
  const state = {
    charts: {
      soldProductsList: {
        list: ['product'],
        byId: {
          product: {
            id: 'orderPosition-1',
            productId: 'product',
            name: 'ZX5',
            pcsOrder: 15,
            price: 600,
            totalPrice: 9000,
          },
        },
      },
    },
  };
  it('should return values for highcharts', () => {
    const dataForChart = [
      {
        name: 'ZX5',
        y: 15,
      },
    ];
    expect(selectors.getChartsDataSoldProducts(state)).toEqual(dataForChart);
  });
});
