import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);

const sellChart = data => Highcharts.chart('sell-chart', {
  chart: {
    type: 'pie',
  },
  title: {
    text: 'Sold products',
  },
  series: [
    {
      name: 'pcs',
      colorByPoint: true,
      data,
    },
  ],
});

export default sellChart;
