import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrdersFiltered } from '../../../store/orders/selectors';
import Order from './Order';
import { fetchChangeOrderStatus } from '../../../store/orders/actionCreators';
import { getAuthToken } from '../../../store/authenticate/selectors';

export class OrdersList extends Component {
  render() {
    const { filteredOrders, handleClick, token } = this.props;
    return (
      <React.Fragment>
        {filteredOrders.map(order => (
          <Order order={order} key={order.id} handleClick={handleClick} token={token} />
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  filteredOrders: getOrdersFiltered(state, ownProps.filterValues),
  token: getAuthToken(state),
});

export default connect(
  mapStateToProps,
  {
    handleClick: fetchChangeOrderStatus,
  },
)(OrdersList);

OrdersList.propTypes = {
  filteredOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
  token: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
