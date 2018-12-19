import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faBatteryEmpty,
  faBatteryQuarter,
  faBatteryHalf,
  faBatteryFull,
} from '@fortawesome/free-solid-svg-icons';
import { addProductToCart, updateProductInCart } from '../../../store/cart/actionCreators';
import AddedToCart from '../Cart/AddedToCart';
import { getAuthToken, getAuthUserId } from '../../../store/authenticate/selectors';
import {
  getProductsInCart,
  getAllOrderPositionsInCart,
  getIdsProductsInCart,
} from '../../../store/cart/selectors';
import { addToWishlist } from '../../../store/wishlist/actionCerators';
import calculateTotalPrice from '../../../shared/calcutalteTotalPrice';
import applyRounded from '../../../shared/applyRounded';
import AddToCartButton from '../../shared/AddToCartButton';

export class Product extends Component {
  state = {
    pcsOrder: 1,
    error: null,
    toggleAddedToCart: false,
  };

  changeInStockToText = (inStock) => {
    if (inStock > 100) return <FontAwesomeIcon icon={faBatteryFull} />;
    if (inStock > 10 && inStock <= 100) return <FontAwesomeIcon icon={faBatteryHalf} />;
    if (inStock > 0 && inStock <= 10) return <FontAwesomeIcon icon={faBatteryQuarter} />;

    return <FontAwesomeIcon icon={faBatteryEmpty} />;
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

  showAddedToCart = () => {
    const { toggleAddedToCart } = this.state;
    this.setState({ toggleAddedToCart: !toggleAddedToCart });
  };

  moreThanInStock = () => !!this.state.error;

  redirectToCart = () => this.props.history.push('/cart');

  handleClickToCart = (product) => {
    const { addProduct, updateProduct, idsProductsInCart } = this.props;
    if (idsProductsInCart.includes(product.productId)) {
      updateProduct(product);
    } else {
      addProduct(product);
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
        id, imgUrl, name, type, price, inStock,
      },
    } = this.props;
    const { pcsOrder, error, toggleAddedToCart } = this.state;
    const totalPrice = calculateTotalPrice(pcsOrder, price);
    const productToCart = {
      productId: id,
      name,
      price: +price,
      pcsOrder: +pcsOrder,
      totalPrice: +totalPrice,
    };
    return (
      <div className="product-item">
        <h3>{name}</h3>
        <hr />
        <img className="product-item__image" src={imgUrl} alt={type} />
        <div className="product-desc">
          <h5>{type}</h5>
          <p className="product-desc__price">
            <span>$</span>
            {price}
          </p>
          <p className="product-desc__instock">
            <span>In stock:</span>
            <span id="stock-message">{this.changeInStockToText(+inStock)}</span>
          </p>
          <p className="product-desc__order">
            <span>Order:</span>
            <span>
              <input type="number" value={pcsOrder} onChange={this.handleChange} />
              pcs
            </span>
          </p>
          <p id="stock-error">{error}</p>
          <p className="product-desc__total">
            Total price:
            <span id="total-price">{`$${applyRounded(totalPrice)}`}</span>
          </p>
          <div className="product-desc__buttons">
            <AddToCartButton
              product={productToCart}
              className="btn btn-primary"
              handleClickToCart={this.handleClickToCart}
              disabled={this.moreThanInStock()}
            />
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => this.handleClickWishlist(productToCart)}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
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
    price: PropTypes.number,
    inStock: PropTypes.number,
  }).isRequired,
  addProduct: PropTypes.func,
  token: PropTypes.string,
  updateProduct: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  addToWish: PropTypes.func.isRequired,
  idsProductsInCart: PropTypes.arrayOf(PropTypes.string),
};

Product.defaultProps = {
  addProduct: null,
  token: null,
  idsProductsInCart: [],
};

const mapStateToProps = state => ({
  token: getAuthToken(state),
  cart: getProductsInCart(state),
  userId: getAuthUserId(state),
  orderPositions: getAllOrderPositionsInCart(state),
  idsProductsInCart: getIdsProductsInCart(state),
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
