import React, { Component } from 'react';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import PropTypes from 'prop-types';
import createChartPurchaseByCompanies from '../../shared/createChartPurchaseByCompanies';

Exporting(Highcharts);

export default class CompaniesBuyChart extends Component {
  componentDidMount() {
    createChartPurchaseByCompanies(this.props.data);
  }

  render() {
    return <div id="companies-buy-chart" />;
  }
}

CompaniesBuyChart.propTypes = {
  data: PropTypes.shape({
    companyId: PropTypes.string,
    totalPrice: PropTypes.number,
  }).isRequired,
};
