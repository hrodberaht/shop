import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);

const companiesBuyChart = () => Highcharts.chart('companies-buy-chart', {
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
  series: [
    {
      name: 'IBM',
      data: [2400],
    },
    {
      name: 'Apple',
      data: [4800],
    },
  ],
});

export default companiesBuyChart;
