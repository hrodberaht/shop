import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchWishlist, removeProductWishlist } from '../../../store/wishlist/actionCerators';
import { getAuthToken, getAuthUserId } from '../../../store/authenticate/selectors';
import { getWishlistLoaded, getWishlistProducts } from '../../../store/wishlist/selectors';
import ProductInWishlist from './ProductInWishlist';
import { addProductToCart, updateProductInCart } from '../../../store/cart/actionCreators';
import { getIdsProductsInCart } from '../../../store/cart/selectors';

export class Wishlist extends Component {
  componentDidMount() {
    const { getWishlist, userId, token } = this.props;
    getWishlist(userId, token);
  }

  remove = (productId) => {
    const { removeProd, userId, token } = this.props;
    removeProd(productId, userId, token);
  };

  handleClickToCart = (product) => {
    const { addProduct, updateProduct, idsProductsInCart } = this.props;
    if (idsProductsInCart.includes(product.productId)) {
      updateProduct(product);
    } else {
      addProduct(product);
    }
    this.remove(product.productId);
  };

  render() {
    const { loaded, products } = this.props;
    if (!loaded) return <h4>Loading</h4>;
    return (
      <div className="wishlist">
        <h3>Wish list:</h3>
        <table>
          <tbody>
            <tr>
              <th>Name:</th>
              <th>Price:</th>
              <th>Pcs:</th>
              <th>Total price:</th>
              <th>Delete:</th>
              <th>Add to cart:</th>
            </tr>
            {products.map(prod => (
              <ProductInWishlist
                product={prod}
                remove={this.remove}
                key={prod.productId}
                handleClickToCart={this.handleClickToCart}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: getAuthToken(state),
  userId: getAuthUserId(state),
  loaded: getWishlistLoaded(state),
  products: getWishlistProducts(state),
  idsProductsInCart: getIdsProductsInCart(state),
});

export default connect(
  mapStateToProps,
  {
    getWishlist: fetchWishlist,
    removeProd: removeProductWishlist,
    addProduct: addProductToCart,
    updateProduct: updateProductInCart,
  },
)(Wishlist);

Wishlist.propTypes = {
  getWishlist: PropTypes.func,
  userId: PropTypes.string,
  token: PropTypes.string.isRequired,
  loaded: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.objectOf),
  removeProd: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  idsProductsInCart: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Wishlist.defaultProps = {
  products: null,
  getWishlist: null,
  userId: null,
};
