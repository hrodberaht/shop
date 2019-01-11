import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import SellChart from './SellChart';
import CompaniesBuyChart from './CompaniesBuyChart';

import { fetchSoldProducts } from '../../store/charts/actionCreators';
import { getChartsDataSoldProducts } from '../../store/charts/selectors';
import { getAuthUserId } from '../../store/authenticate/selectors';

export class Analytics extends Component {
  componentDidMount() {
    const { userId, soldProducts } = this.props;
    soldProducts(userId);
  }

  render() {
    const { dataSellChart, userId } = this.props;
    return (
      <div>
        {dataSellChart.length === 0 ? <p>Loading...</p> : <SellChart data={dataSellChart} />}
        <Query
          query={gql`
            {
              orders {
                totalPrice
                companyId
              }
            }
          `}
          fetchPolicy="network-only"
          variables={{ id: userId }}
        >
          {data => <CompaniesBuyChart fetchedData={data} />}
        </Query>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dataSellChart: getChartsDataSoldProducts(state),
  userId: getAuthUserId(state),
});

export default connect(
  mapStateToProps,
  { soldProducts: fetchSoldProducts },
)(Analytics);

Analytics.propTypes = {
  dataSellChart: PropTypes.arrayOf(PropTypes.object).isRequired,
  soldProducts: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};
