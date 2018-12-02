import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SellChart from './SellChart';
import CompaniesBuyChart from './CompaniesBuyChart';
import { fetchSoldProducts } from '../../store/charts/actionCreators';

export class Analytics extends Component {
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

  componentDidMount() {
    this.props.soldProducts();
  }

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

export default connect(
  null,
  { soldProducts: fetchSoldProducts },
)(Analytics);

Analytics.propTypes = {
  dataSellChart: PropTypes.arrayOf().isRequired,
  soldProducts: PropTypes.func.isRequired,
};
