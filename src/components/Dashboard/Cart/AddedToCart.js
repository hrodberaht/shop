import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddedToCart extends Component {
  render() {
    const {
      product: {
        name, price, pcsOrder, totalPrice,
      },
      show,
      redirect,
    } = this.props;
    return (
      <div className="cart-popup">
        <div className="cart-popup__inside">
          <h4>Product added to cart:</h4>
          <p>
            <span>Name:</span>
            {name}
          </p>
          <p>
            <span>Price:</span>
            {price}
          </p>
          <p>
            <span>Pcs:</span>
            {pcsOrder}
          </p>
          <p>
            <span>Tota price:</span>
            {totalPrice}
          </p>
          <div className="cart-popup__buttons">
            <button id="more" className="btn btn-primary" type="button" onClick={show}>
              More
            </button>
            <button id="cart" className="btn btn-primary" type="button" onClick={redirect}>
              Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

AddedToCart.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    pcsOrder: PropTypes.number,
    totalPrice: PropTypes.number,
  }).isRequired,
  show: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
};
