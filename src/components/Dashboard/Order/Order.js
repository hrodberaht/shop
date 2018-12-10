import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faShippingFast } from '@fortawesome/free-solid-svg-icons';
import ProductsInOrder from './ProductsInOrder';
import ConnectedAuthorization from '../../Auth/Authorization';
import priceFix from '../../../shared/priceFix';

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
          <td>{priceFix(totalPrice)}</td>
          <td>{status}</td>
          <td>
            <button type="button" className="btn-orders-detail" onClick={this.handleClickDetails}>
              <FontAwesomeIcon icon={details ? faAngleUp : faAngleDown} />
            </button>
          </td>
          <ConnectedAuthorization
            render
            withRoleAdmin={(
              <td className="orders_realized">
                <button
                  className="btn btn-submit"
                  type="button"
                  disabled={order.status === 'realized'}
                  onClick={() => handleClick(order.id, token)}
                >
                  <FontAwesomeIcon icon={faShippingFast} />
                </button>
              </td>
)}
          />
        </tr>
        {details && (
          <tr key={order.date}>
            <ProductsInOrder order={order} />
          </tr>
        )}
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
