import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SellChart from './SellChart';
import CompaniesBuyChart from './CompaniesBuyChart';
import { fetchSoldProducts } from '../../store/charts/actionCreators';
import { getChartsDataSoldProducts } from '../../store/charts/selectors';

export class Analytics extends Component {
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

const mapStateToProps = state => ({
  dataSellChart: getChartsDataSoldProducts(state),
});

export default connect(
  mapStateToProps,
  { soldProducts: fetchSoldProducts },
)(Analytics);

Analytics.propTypes = {
  dataSellChart: PropTypes.arrayOf(PropTypes.object).isRequired,
  soldProducts: PropTypes.func.isRequired,
};
