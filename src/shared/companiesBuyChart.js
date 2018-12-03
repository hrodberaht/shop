import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);

const companiesBuyChart = (data) => {
  const companies = data.orders.filter(order => order.companyId !== '');
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
    series: companies.map(company => ({ name: company.companyId, data: [company.totalPrice] })),
  });
};

export default companiesBuyChart;
