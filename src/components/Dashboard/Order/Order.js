import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductsInOrder from './ProductsInOrder';

export default class Order extends Component {
  state = {
    details: false,
  };

  handleClickDetails = () => {
    this.setState(state => ({ details: !state.details }));
  };

  render() {
    const {
      order,
      order: {
        id, person, totalPrice, status, date,
      },
    } = this.props;
    return (
      <React.Fragment>
        <tr>
          <td>{id}</td>
          <td>{person}</td>
          <td>{date}</td>
          <td>{totalPrice}</td>
          <td>{status}</td>
          <td>
            <button type="button" onClick={this.handleClickDetails}>
              \/
            </button>
          </td>
          <td>
            <button
              className="btn btn-submit"
              type="button"
              disabled={order.status === 'realized'}
              // onClick={() => handleClick(order.id, token)}
            >
              Realise
            </button>
          </td>
        </tr>
        {this.state.details ? (
          <tr key={order.date}>
            <ProductsInOrder order={order} />
          </tr>
        ) : null}
      </React.Fragment>
    );
  }
}

Order.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string,
    userId: PropTypes.string,
    data: PropTypes.string,
    totalPrice: PropTypes.number,
    status: PropTypes.string,
  }).isRequired,
};
