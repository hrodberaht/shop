import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Product extends Component {
  state = {
    pcsOrder: 0,
    error: null,
  };

  changeInStockToText = (inStock) => {
    if (inStock > 100) return 'full supply';
    if (inStock > 10 && inStock <= 100) return 'medium supply';
    if (inStock > 0 && inStock <= 10) return 'last pieces';

    return 'not available';
  };

  handleChange = (e) => {
    const {
      product: { inStock },
    } = this.props;
    this.setState({ pcsOrder: e.target.value });
    this.checkAmountOrder(+inStock, +e.target.value);
  };

  checkAmountOrder = (inStock, pcsOrder) => {
    if (pcsOrder > inStock) return this.setState({ error: 'Not enough products' });
    if (pcsOrder < 0) return this.setState({ pcsOrder: 0 });
    return this.setState({ error: null });
  };

  calculateTotalPrice = (pcsOrder, price) => pcsOrder * price;

  render() {
    const {
      product: {
        name, type, price, inStock,
      },
    } = this.props;
    const { pcsOrder, error } = this.state;
    return (
      <div className="product-item">
        <h3>{name}</h3>
        <h5>{type}</h5>
        <p className="product-item__price">
          <span>$</span>
          {price}
        </p>
        <p>
          <span>In stock:</span>
          {'  '}
          <span id="stock-message">{this.changeInStockToText(+inStock)}</span>
        </p>
        <p className="product-item__order">
          {' '}
          Order:
          <input type="number" value={pcsOrder} onChange={this.handleChange} />
          pcs
        </p>
        <p id="stock-error">{error}</p>
        <p className="product-item__total">
          <span>Total price:</span>
          {'  '}
          <span id="total-price">
            <span>$</span>
            {this.calculateTotalPrice(pcsOrder, price)}
          </span>
        </p>
        <button className="btn btn-primary" type="button">
          Buy
        </button>
      </div>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.string,
    inStock: PropTypes.string,
  }).isRequired,
};
