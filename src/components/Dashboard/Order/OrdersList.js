import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrders, getLoadedStatus } from '../../../store/orders/selectors';
import ConnectedAuthorization from '../../Auth/Authorization';
import Order from './Order';

import { fetchOrders, fetchChangeOrderStatus } from '../../../store/orders/actionCreators';
import { getAuthToken, getAuthUserId } from '../../../store/authenticate/selectors';
import OrdersSearch from './OrdersSearch';

export class OrdersList extends Component {
  state = {
    isOnlyUnrealizedOrders: false,
  };

  componentDidMount() {
    const { getOrdersFromServer, token, userId } = this.props;
    getOrdersFromServer(userId, token);
  }

  toggleUnrelizedOrders = () => {
    this.setState(state => ({ isOnlyUnrealizedOrders: !state.isOnlyUnrealizedOrders }));
  };

  toggleRealizedOrders = () => {
    this.setState(state => ({ isOnlyRealizedOrders: !state.isOnlyRealizedOrders }));
  };

  createUrnrealizedOrdersList = orders => (this.state.isOnlyUnrealizedOrders
    ? orders.filter(order => order.status === 'in-progress')
    : orders);

  createRealizedOrdersList = orders => (this.state.isOnlyUnrealizedOrders
    ? orders.filter(order => order.status === 'realized')
    : orders);

  filteredOrdersList = orders => this.createUrnrealizedOrdersList(orders);

  render() {
    const {
      orders, handleClick, loaded, token,
    } = this.props;
    if (!loaded) return <p>Loading...</p>;
    return (
      <React.Fragment>
        <div>
          <OrdersSearch title="Show unrealized orders" handleCheck={this.toggleUnrelizedOrders} />
          <OrdersSearch title="Show realized orders" handleCheck={this.toggleRealizedOrders} />
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
            {this.filteredOrdersList(orders).map(order => (
              <Order order={order} key={order.id} handleClick={handleClick} token={token} />
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  orders: getOrders(state),
  loaded: getLoadedStatus(state),
  token: getAuthToken(state),
  userId: getAuthUserId(state),
});

export default connect(
  mapStateToProps,
  {
    handleClick: fetchChangeOrderStatus,
    getOrdersFromServer: fetchOrders,
  },
)(OrdersList);

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClick: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
  getOrdersFromServer: PropTypes.func.isRequired,
  token: PropTypes.string,
  userId: PropTypes.string,
};

OrdersList.defaultProps = {
  token: null,
  userId: null,
};
