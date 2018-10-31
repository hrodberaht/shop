import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Order extends Component {
  render() {
    const {
      order: {
        id, userId, totalPrice, status,
      },
    } = this.props;
    return (
      <React.Fragment>
        <td>{id}</td>
        <td>{userId}</td>
        <td>data</td>
        <td>{totalPrice}</td>
        <td>{status}</td>
      </React.Fragment>
    );
  }
}

Order.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string,
    userId: PropTypes.string,
    data: PropTypes.string,
    totalPrice: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};
