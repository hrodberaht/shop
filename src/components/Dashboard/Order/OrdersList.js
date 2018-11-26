import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrders, getLoadedStatus } from '../../../store/orders/selectors';
import Order from './Order';
import ConnectedAuthorization from '../../Auth/Authorization';
import { fetchOrders, fetchChangeOrderStatus } from '../../../store/orders/actionCreators';
import { getAuthToken, getAuthUserId } from '../../../store/authenticate/selectors';

export class OrdersList extends Component {
  componentDidMount() {
    const { getOrdersFromServer, token, userId } = this.props;
    getOrdersFromServer(userId, token);
  }

  render() {
    const {
      orders, handleClick, loaded, token,
    } = this.props;
    if (!loaded) return <p>Loading...</p>;
    return (
      <table>
        <tbody>
          <tr className="order-table-title">
            <th>Id:</th>
            <th>Person:</th>
            <th>Date:</th>
            <th>Total price:</th>
            <th>Status:</th>
            <th>Actions:</th>
            <th>Admin:</th>
          </tr>
          {orders.map(order => (
            <Order order={order} key={order.id} />
            /* <td>
                  <ConnectedAuthorization
                    render
                    withRoleAdmin={(
                      <button
                        className="btn btn-submit"
                        type="button"
                        disabled={order.status === 'realized'}
                        onClick={() => handleClick(order.id, token)}
                      >
                        Realise
                      </button>
)}
                  />
                </td> */
          ))}
        </tbody>
      </table>
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
