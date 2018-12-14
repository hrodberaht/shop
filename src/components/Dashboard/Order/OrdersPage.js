import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getOrders, getLoadedStatus } from '../../../store/orders/selectors';
import ConnectedAuthorization from '../../Auth/Authorization';

import { fetchOrders, fetchChangeOrderStatus } from '../../../store/orders/actionCreators';
import { getAuthToken, getAuthUserId } from '../../../store/authenticate/selectors';
import OrdersSearch from './OrdersSearch';
import OrdersList from './OrdersList';

export class OrdersPage extends Component {
  defaultState = {};

  state = {
    status: 'all',
  };

  componentDidMount() {
    const { getOrdersFromServer, token, userId } = this.props;
    getOrdersFromServer(userId, token);
  }

  handleSelect = (e) => {
    this.setState({ status: e.target.value });
  };

  render() {
    const { orders, loaded } = this.props;
    const { status } = this.state;
    if (!loaded) return <p>Loading...</p>;
    return (
      <React.Fragment>
        <div>
          <OrdersSearch handleSelect={this.handleSelect} />
        </div>
        <table>
          <tbody>
            <tr className="order-table-title">
              <th>Id:</th>
              <th>Person:</th>
              <th>Date:</th>
              <th>Total price:</th>
              <th>Status:</th>
              <th>Actions:</th>
              <ConnectedAuthorization render withRoleAdmin={<th>Admin:</th>} />
            </tr>
            <OrdersList
              filterValues={status === 'all' ? this.defaultState : this.state}
              orders={orders}
            />
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  token: getAuthToken(state),
  orders: getOrders(state),
  loaded: getLoadedStatus(state),
  userId: getAuthUserId(state),
});

export default connect(
  mapStateToProps,
  {
    handleClick: fetchChangeOrderStatus,
    getOrdersFromServer: fetchOrders,
  },
)(OrdersPage);

OrdersPage.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  loaded: PropTypes.bool.isRequired,
  getOrdersFromServer: PropTypes.func.isRequired,
  token: PropTypes.string,
  userId: PropTypes.string,
};

OrdersPage.defaultProps = {
  token: null,
  userId: null,
};
