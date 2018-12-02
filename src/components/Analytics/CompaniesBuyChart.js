import React, { Component } from 'react';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import companiesBuyChart from '../../shared/companiesBuyChart';

Exporting(Highcharts);

export default class CompaniesBuyChart extends Component {
  componentDidMount() {
    companiesBuyChart();
  }

  render() {
    return <div id="companies-buy-chart" />;
  }
}
