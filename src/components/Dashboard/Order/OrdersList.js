import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrdersFiltered, getOrdersFilterValues } from '../../../store/orders/selectors';
import Order from './Order';
import { fetchChangeOrderStatus } from '../../../store/orders/actionCreators';

export class OrdersList extends Component {
  render() {
    const { filteredOrders, handleClick } = this.props;
    return (
      <React.Fragment>
        {filteredOrders.map(order => (
          <Order order={order} key={order.id} handleClick={handleClick} />
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  filteredOrders: getOrdersFiltered(state, ownProps.filterValues),
  filterValues: getOrdersFilterValues(state, ownProps),
});

export default connect(
  mapStateToProps,
  {
    handleClick: fetchChangeOrderStatus,
  },
)(OrdersList);

OrdersList.propTypes = {
  filteredOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClick: PropTypes.func.isRequired,
};
