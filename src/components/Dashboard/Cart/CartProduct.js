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
        <td>
          <span>$</span>
          {totalPrice}
        </td>
      </tr>
    );
  }
}

CartProduct.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    pcsOrder: PropTypes.number,
    totalPrice: PropTypes.number,
  }).isRequired,
};
