import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);

const createChartPurchaseByCompanies = data => {
  const series = [];
  data.orders.forEach(company => {
    if (series.length === 0) return series.push(company);
    const index = series.findIndex(
      serie => serie.companyId === company.companyId,
    );
    return index > 0
      ? (series[index] = {
          ...company,
          totalPrice: series[index].totalPrice + company.totalPrice,
        })
      : series.push(company);
  });
  Highcharts.chart('companies-buy-chart', {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Sells',
    },
    xAxis: {
      categories: ['Sumary'],
    },
    yAxis: {
      title: {
        text: 'Sells',
      },
    },
    series: series.map(company => ({
      name: company.companyId,
      data: [company.totalPrice],
    })),
  });
};

export default createChartPurchaseByCompanies;
