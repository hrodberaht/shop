import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SellChart from './SellChart';
import CompaniesBuyChart from './CompaniesBuyChart';

export default class Analytics extends Component {
  dataSellChart = [
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
  ];

  render() {
    const { dataSellChart } = this.props;
    return (
      <div>
        <SellChart data={dataSellChart} />
        <CompaniesBuyChart />
      </div>
    );
  }
}

Analytics.propTypes = {
  dataSellChart: PropTypes.arrayOf().isRequired,
};
