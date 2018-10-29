import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import getProductsInCart from '../../../store/cart/selectors';
import CartProduct from './CartProduct';
import { clearCart } from '../../../store/cart/actionCreator';

export class Cart extends Component {
  sumaryPrice = () => {
    const { products } = this.props;
    let sumary = 0;
    products.map((product) => {
      sumary += product.totalPrice;
      return sumary;
    });

    return sumary;
  };

  handleClick = () => {
    const { emptyCart } = this.props;
    alert('Thanks for order');
    emptyCart();
    return this.props.history.push('/orders');
  };

  render() {
    return (
      <div className="cart">
        <table>
          <tbody className="cart-produts__item">
            <tr>
              <th>Name:</th>
              <th>Price:</th>
              <th>pcsOrder:</th>
              <th>totalPrice:</th>
            </tr>
            {this.props.products.map(product => (
              <CartProduct key={product.id} product={product} />
            ))}
          </tbody>
        </table>
        <p className="cart__name">
          Summary:
          {this.sumaryPrice()}
        </p>
        <button className="btn btn-primary" type="button" onClick={this.handleClick}>
          Buy
        </button>
      </div>
    );
  }
}

withRouter(Cart);
const mapStateToProps = state => ({
  products: getProductsInCart(state),
});

export default connect(
  mapStateToProps,
  { emptyCart: clearCart },
)(Cart);

Cart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyCart: PropTypes.func.isRequired,
};
