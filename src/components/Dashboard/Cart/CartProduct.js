import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CartProduct extends Component {
  handleClick = () => {
    const { remove, product } = this.props;
    remove(product);
  };

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
        <td>
          <button type="button" className="btn btn-danger" onClick={this.handleClick}>
            X
          </button>
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
  remove: PropTypes.func.isRequired,
};
