import React, { Component } from 'react';
import PropTypes from 'prop-types';
import calculateTotalPrice from '../../../shared/calcutalteTotalPrice';
import priceFix from '../../../shared/priceFix';

export default class CartProduct extends Component {
  state = {
    quantity: this.props.product.pcsOrder,
  };

  handleClick = () => {
    const { remove, product } = this.props;
    remove(product);
  };

  handleOnChange = (e) => {
    const { product, changeQuantity } = this.props;
    const quantity = e.target.value > 1 ? +e.target.value : 1;
    this.setState({ quantity });
    const totalPrice = calculateTotalPrice(quantity, product.price);
    const cartPosition = { ...product, pcsOrder: quantity, totalPrice };
    changeQuantity(cartPosition);
  };

  render() {
    const {
      product: { name, price, totalPrice },
    } = this.props;
    return (
      <tr>
        <td>{name}</td>
        <td>{price}</td>
        <td>
          <input value={this.state.quantity} type="number" onChange={this.handleOnChange} />
        </td>
        <td>
          <span>$</span>
          {priceFix(totalPrice)}
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
  changeQuantity: PropTypes.func.isRequired,
};
