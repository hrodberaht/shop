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
      id: PropTypes.string,
      pcsOrder: PropTypes.number,
      totalPrice: PropTypes.number,
    }).isRequired,
    handleClickToCart: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
  };

  render() {
    const {
      className, handleClickToCart, product, disabled,
    } = this.props;
    return (
      <button
        type="button"
        className={className}
        onClick={() => handleClickToCart(product)}
        disabled={disabled}
      >
        <FontAwesomeIcon icon={faCartPlus} />
      </button>
    );
  }
}
