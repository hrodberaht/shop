import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductInWhislist extends Component {
  handleClick = () => {
    const {
      remove,
      product: { productId },
    } = this.props;
    remove(productId);
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

ProductInWhislist.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  remove: PropTypes.func.isRequired,
};
