import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sellChart from '../../shared/createSellChart';

export default class SellChart extends Component {
  componentDidMount() {
    sellChart(this.props.data);
  }

  render() {
    return <div id="sell-chart" />;
  }
}

SellChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
