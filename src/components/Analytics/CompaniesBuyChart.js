import React, { Component } from 'react';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import PropTypes from 'prop-types';
import createChartPurchaseByCompanies from '../../shared/createChartPurchaseByCompanies';
import withDataFromGraphql from '../HOC/withDataFromGraphql';

Exporting(Highcharts);

export class CompaniesBuyChart extends Component {
  componentDidMount() {
    createChartPurchaseByCompanies(this.props.fetchedData.data);
  }

  render() {
    return <div id="companies-buy-chart" />;
  }
}

CompaniesBuyChart.propTypes = {
  fetchedData: PropTypes.shape({
    data: PropTypes.shape({
      companyId: PropTypes.string,
      totalPrice: PropTypes.number,
    }),
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};

export default withDataFromGraphql(CompaniesBuyChart);
