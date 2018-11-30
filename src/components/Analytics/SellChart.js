import React, { Component } from 'react';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);

export default class SellChart extends Component {
  componentDidMount() {
    Highcharts.chart('sell-chart', {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Fruit Consumption',
      },
      series: [
        {
          name: 'Brands',
          colorByPoint: true,
          data: [
            {
              name: 'Prod1',
              y: 62.0,
            },
            {
              name: 'Prod2',
              y: 18.0,
            },
            {
              name: 'Prod3',
              y: 15.0,
            },
            {
              name: 'Prod4',
              y: 5.0,
            },
          ],
        },
      ],
    });
  }

  render() {
    return <div id="sell-chart" />;
  }
}
