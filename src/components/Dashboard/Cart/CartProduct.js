import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CartProduct extends Component {
  render() {
    const {
      product: {
        name, price, pcsOrder, totalPrice,
      },
    } = this.props;
    return (
      <tr>
        <td>{name}</td>
        <td>{price}</td>
        <td>{pcsOrder}</td>
        <td>{totalPrice}</td>
      </tr>
    );
  }
}

CartProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.string,
    inStock: PropTypes.string,
  }).isRequired,
};
