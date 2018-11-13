import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { getProductsInCart, getOrderPositionIds } from '../../../store/cart/selectors';
import CartProduct from './CartProduct';
import { clearCart, removeFromCart } from '../../../store/cart/actionCreators';
import { addOrderToDB } from '../../../store/orders/actionCreators';
import {
  getAuthUserId,
  getAuthToken,
  getAuthPerson,
  getAuthCompanyId,
} from '../../../store/auth/selectors';

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

  remove = (id) => {
    this.props.removeFrom(id);
  };

  handleClick = () => {
    const {
      emptyCart,
      createOrder,
      userId,
      person,
      token,
      companyId,
      orderPositionIds,
    } = this.props;
    const order = {
      userId,
      person,
      totalPrice: +this.sumaryPrice(),
      status: 'in-progress',
      date: moment().format('MMMM Do YYYY, h:mm:ss a'),
      companyId,
      orderPositionIds,
    };
    createOrder(order, token);
    emptyCart();
    this.props.history.push('/orders');
  };

  render() {
    const { products } = this.props;
    return (
      <div className="cart">
        <h3>Products in your cart:</h3>
        <table>
          <tbody className="cart-produts__item">
            <tr>
              <th>Name:</th>
              <th>Price:</th>
              <th>Pcs:</th>
              <th>Total price:</th>
              <th>Delete:</th>
            </tr>
            {products.map(product => (
              <CartProduct key={product.id} product={product} remove={this.remove} />
            ))}
          </tbody>
        </table>
        <p className="cart__sumary">
          <span>$</span>
          {this.sumaryPrice()}
        </p>
        <button
          className="btn btn-primary"
          type="button"
          onClick={this.handleClick}
          disabled={products.length === 0}
        >
          Buy
        </button>
      </div>
    );
  }
}

withRouter(Cart);
const mapStateToProps = state => ({
  products: getProductsInCart(state),
  userId: getAuthUserId(state),
  token: getAuthToken(state),
  person: getAuthPerson(state),
  companyId: getAuthCompanyId(state),
  orderPositionIds: getOrderPositionIds(state),
});

export default connect(
  mapStateToProps,
  {
    emptyCart: clearCart,
    createOrder: addOrderToDB,
    removeFrom: removeFromCart,
  },
)(Cart);

Cart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyCart: PropTypes.func.isRequired,
  createOrder: PropTypes.func.isRequired,
  removeFrom: PropTypes.func.isRequired,
  companyId: PropTypes.string,
  userId: PropTypes.string.isRequired,
  person: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  orderPositionIds: PropTypes.arrayOf(PropTypes.arrayOf).isRequired,
};

Cart.defaultProps = {
  companyId: null,
};
