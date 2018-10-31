import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrders } from '../../../store/orders/selectors';
import Order from './Order';
import ConnectedAuthorization from '../../Auth/Authorization';
import { changeOrderStatus } from '../../../store/orders/actionCreator';

export class OrdersList extends Component {
  render() {
    const { orders, handleClick } = this.props;
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Id:</th>
              <th>Person:</th>
              <th>Date:</th>
              <th>Total price:</th>
              <th>Status:</th>
              <ConnectedAuthorization render withRoleAdmin={<th>Change status:</th>} />
            </tr>
            {orders.map(order => (
              <tr key={order.id}>
                <Order order={order} />
                <ConnectedAuthorization
                  render
                  withRoleAdmin={(
                    <td>
                      <button type="button" onClick={() => handleClick(order.id)}>
                        Realise
                      </button>
                    </td>
)}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  orders: getOrders(state),
});

export default connect(
  mapStateToProps,
  { handleClick: changeOrderStatus },
)(OrdersList);

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClick: PropTypes.func.isRequired,
};
