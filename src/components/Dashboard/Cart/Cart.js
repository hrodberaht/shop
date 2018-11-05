import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getProductsInCart, getOrderPositionIds } from '../../../store/cart/selectors';
import CartProduct from './CartProduct';
import { clearCart } from '../../../store/cart/actionCreator';
import { addOrderToDB } from '../../../store/orders/actionCreator';
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

  handleClick = async () => {
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
      date: new Date(),
      companyId,
      orderPositionIds,
    };
    await createOrder(order, token);
    emptyCart();
    return this.props.history.push('/orders');
  };

  render() {
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
            </tr>
            {this.props.products.map(product => (
              <CartProduct key={product.id} product={product} />
            ))}
          </tbody>
        </table>
        <p className="cart__sumary">
          <span>$</span>
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
  },
)(Cart);

Cart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyCart: PropTypes.func.isRequired,
  createOrder: PropTypes.func.isRequired,
  companyId: PropTypes.string,
};

Cart.defaultProps = {
  companyId: null,
};
