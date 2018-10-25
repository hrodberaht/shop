import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Product extends Component {
  state = {
    amoutOrder: 0,
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
    this.setState({ amoutOrder: e.target.value });
    this.checkAmountOrder(+inStock, +e.target.value);
  };

  checkAmountOrder = (inStock, amoutOrder) => {
    if (amoutOrder > inStock) return this.setState({ error: 'Not enough products' });
    if (amoutOrder < 0) return this.setState({ amoutOrder: 0 });
    return this.setState({ error: null });
  };

  calculateTotalPrice = (amoutOrder, price) => amoutOrder * price;

  render() {
    const {
      product: {
        name, type, price, inStock,
      },
    } = this.props;
    const { amoutOrder, error } = this.state;
    return (
      <div className="product-item">
        <h3>{name}</h3>
        <h5>{type}</h5>
        <p>
          Price:
          {price}
        </p>
        <p id="stock">
          Stock:
          <span id="stock-message">{this.changeInStockToText(+inStock)}</span>
        </p>
        Order:
        <input type="number" value={amoutOrder} onChange={this.handleChange} />
        <p id="stock-error">{error}</p>
        <p>
          Total price:
          <span id="total-price">{this.calculateTotalPrice(amoutOrder, price)}</span>
        </p>
        <button type="button">Add to cart</button>
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
