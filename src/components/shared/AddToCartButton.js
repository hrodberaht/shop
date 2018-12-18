import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

export default class AddToCartButton extends Component {
  static propTypes = {
    product: PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      price: PropTypes.number,
    }).isRequired,
    handleClickToCart: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
  };

  render() {
    const { className, handleClickToCart, product } = this.props;
    return (
      <button type="button" className={className} onClick={() => handleClickToCart(product)}>
        <FontAwesomeIcon icon={faCartPlus} />
      </button>
    );
  }
}
