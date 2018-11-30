import React, { Component } from 'react';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);

export default class CompaniesBuyChart extends Component {
  componentDidMount() {
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
  }

  render() {
    return <div id="companies-buy-chart" />;
  }
}
