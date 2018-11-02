import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductsInOrder extends Component {
  render() {
    const {
      order: { productsOrder },
    } = this.props;
    return (
      <td colSpan="5">
        <table>
          <tbody>
            <tr>
              <th>Name:</th>
              <th>Pcs:</th>
              <th>Price</th>
              <th>Total price:</th>
            </tr>
            {productsOrder.map((product) => {
              const {
                id, name, price, pcsOrder, totalPrice,
              } = product;
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{pcsOrder}</td>
                  <td>{price}</td>
                  <td>{totalPrice}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </td>
    );
  }
}

ProductsInOrder.propTypes = {
  order: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
};
