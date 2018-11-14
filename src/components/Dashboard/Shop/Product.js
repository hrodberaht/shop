import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addProductToCart, updateProductInCart } from '../../../store/cart/actionCreators';
import AddedToCart from '../Cart/AddedToCart';
import { getAuthToken, getAuthUserId } from '../../../store/authenticate/selectors';
import { getProductsInCart } from '../../../store/cart/selectors';
import { addToWishlist } from '../../../store/wishlist/actionCerators';

export class Product extends Component {
  state = {
    pcsOrder: 1,
    error: null,
    toggleAddedToCart: false,
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
    if (pcsOrder < 1) return this.setState({ pcsOrder: 1 });
    return this.setState({ error: null });
  };

  calculateTotalPrice = (pcsOrder, price) => pcsOrder * price;

  showAddedToCart = () => {
    const { toggleAddedToCart } = this.state;
    this.setState({ toggleAddedToCart: !toggleAddedToCart });
  };

  moreThanInStock = () => (!!this.state.error);

  redirectToCart = () => this.props.history.push('/cart');

  handleClick = (product) => {
    const {
      addProduct, cart, updateProduct, token,
    } = this.props;
    const inCart = cart.find(prod => prod.productId === product.productId);

    if (inCart) {
      const combProd = Object.assign(inCart, {
        pcsOrder: inCart.pcsOrder + product.pcsOrder,
        totalPrice: inCart.totalPrice + product.totalPrice,
      });
      updateProduct(combProd, token);
    } else {
      addProduct(product, this.props.token);
    }

    this.showAddedToCart();
  };

  handleClickWishlist = (product) => {
    const { addToWish, userId, token } = this.props;
    addToWish(product, userId, token);
  };

  render() {
    const {
      product: {
        id, name, type, price, inStock,
      },
    } = this.props;
    const { pcsOrder, error, toggleAddedToCart } = this.state;
    const totalPrice = this.calculateTotalPrice(pcsOrder, price);
    const productToCart = {
      productId: id,
      name,
      price: +price,
      pcsOrder: +pcsOrder,
      totalPrice,
    };
    return (
      <div>
        <div className="product-item">
          <h3>{name}</h3>
          <h5>{type}</h5>
          <p className="product-item__price">
            <span>$</span>
            {price}
          </p>
          <p>
            <span>In stock:</span>
            <span id="stock-message">{this.changeInStockToText(+inStock)}</span>
          </p>
          <p className="product-item__order">
            Order:
            <input type="number" value={pcsOrder} onChange={this.handleChange} />
            pcs
          </p>
          <p id="stock-error">{error}</p>
          <p className="product-item__total">
            <span>Total price:</span>
            <span id="total-price">
              <span>$</span>
              {totalPrice}
            </span>
          </p>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => this.handleClick(productToCart)}
            disabled={this.moreThanInStock()}
          >
            Add to cart
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => this.handleClickWishlist(productToCart)}
          >
            Wish
          </button>
        </div>
        {toggleAddedToCart && (
          <AddedToCart
            product={productToCart}
            redirect={this.redirectToCart}
            show={this.showAddedToCart}
          />
        )}
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
  addProduct: PropTypes.func,
  token: PropTypes.string,
  cart: PropTypes.arrayOf(PropTypes.objectOf),
  updateProduct: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  addToWish: PropTypes.func.isRequired,
};

Product.defaultProps = {
  addProduct: null,
  token: null,
  cart: [],
};

const mapStateToProps = state => ({
  token: getAuthToken(state),
  cart: getProductsInCart(state),
  userId: getAuthUserId(state),
});
export default withRouter(
  connect(
    mapStateToProps,
    {
      addProduct: addProductToCart,
      updateProduct: updateProductInCart,
      addToWish: addToWishlist,
    },
  )(Product),
);
