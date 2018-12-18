import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddToCartButton from '../../shared/AddToCartButton';

export default class ProductInWishlist extends Component {
  handleClick = () => {
    const {
      remove,
      product: { productId },
    } = this.props;
    remove(productId);
  };

  render() {
    const {
      product,
      product: {
        name, price, pcsOrder, totalPrice,
      },
      handleClickToCart,
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
        <td>
          <AddToCartButton
            className="btn btn-primary"
            product={product}
            handleClickToCart={handleClickToCart}
          />
        </td>
      </tr>
    );
  }
}

ProductInWishlist.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  remove: PropTypes.func.isRequired,
  handleClickToCart: PropTypes.func.isRequired,
};
