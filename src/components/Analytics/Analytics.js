import React, { Component } from 'react';
import SellChart from './SellChart';
import CompaniesBuyChart from './CompaniesBuyChart';

export default class Analytics extends Component {
  render() {
    return (
      <div>
        <SellChart />
        <CompaniesBuyChart />
      </div>
    );
  }
}
