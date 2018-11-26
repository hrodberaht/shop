import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import ProductsInOrder from './ProductsInOrder';
import ConnectedAuthorization from '../../Auth/Authorization';

export default class Order extends Component {
  state = {
    details: false,
  };

  handleClickDetails = () => {
    this.setState(state => ({ details: !state.details }));
  };

  render() {
    const { details } = this.state;
    const {
      handleClick,
      token,
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
            <button type="button" className="btn-orders-detail" onClick={this.handleClickDetails}>
              {details ? (
                <FontAwesomeIcon icon={faAngleUp} />
              ) : (
                <FontAwesomeIcon icon={faAngleDown} />
              )}
            </button>
          </td>
          <td>
            <ConnectedAuthorization
              render
              withRoleAdmin={(
                <button
                  className="btn btn-submit"
                  type="button"
                  disabled={order.status === 'realized'}
                  onClick={() => handleClick(order.id, token)}
                >
                  Realise
                </button>
)}
            />
          </td>
        </tr>
        {details ? (
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
  handleClick: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};
