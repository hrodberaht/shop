import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { getProductsInCart, getOrderPositionIds } from '../../../store/cart/selectors';
import CartProduct from './CartProduct';
import {
  clearCart,
  removeFromCart,
  updateQuantityInCart,
} from '../../../store/cart/actionCreators';
import { addOrderToDB } from '../../../store/orders/actionCreators';
import {
  getAuthUserId,
  getAuthToken,
  getAuthPerson,
  getAuthCompanyId,
} from '../../../store/authenticate/selectors';

export class Cart extends Component {
  sumaryPrice = () => {
    const {
      cart: { list, byId },
    } = this.props;
    let sumary = 0;
    list.map((item) => {
      sumary += byId[item].totalPrice;
      return sumary;
    });
    return sumary;
  };

  changeQuantity = (cartPosition) => {
    const { change, token } = this.props;
    change(cartPosition, token);
  };

  remove = product => this.props.removeFrom(product);

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
    const {
      cart: { list, byId },
    } = this.props;
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
            {list.map(item => (
              <CartProduct
                key={byId[item].id}
                product={byId[item]}
                remove={this.remove}
                changeQuantity={this.changeQuantity}
              />
            ))}
          </tbody>
        </table>
        <div className="cart__sumary">
          <p>
$
            {this.sumaryPrice()}
          </p>
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.handleClick}
            disabled={list.length === 0}
          >
            Buy
          </button>
        </div>
      </div>
    );
  }
}

withRouter(Cart);
const mapStateToProps = state => ({
  cart: getProductsInCart(state),
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
    change: updateQuantityInCart,
  },
)(Cart);

Cart.propTypes = {
  cart: PropTypes.shape({
    list: PropTypes.array,
    byId: PropTypes.object,
  }).isRequired,
  emptyCart: PropTypes.func.isRequired,
  createOrder: PropTypes.func.isRequired,
  removeFrom: PropTypes.func.isRequired,
  companyId: PropTypes.string,
  userId: PropTypes.string.isRequired,
  person: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  orderPositionIds: PropTypes.arrayOf(PropTypes.arrayOf).isRequired,
  change: PropTypes.func.isRequired,
};

Cart.defaultProps = {
  companyId: null,
};
