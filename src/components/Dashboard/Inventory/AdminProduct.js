import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ConnectedAddProductForm from './AddProductForm';

export default class AdminProduct extends Component {
  state = {
    toggleEdit: false,
  };

  handleEditClick = () => {
    this.setState(state => ({
      toggleEdit: !state.toggleEdit,
    }));
  };

  render() {
    const {
      product: {
        name, type, price, inStock,
      },
    } = this.props;

    return (
      <React.Fragment>
        {this.state.toggleEdit ? (
          <td colSpan="6">
            <ConnectedAddProductForm />
            <button type="button" onClick={this.handleEditClick}>
              Close
            </button>
          </td>
        ) : (
          <React.Fragment>
            <td>{name}</td>
            <td>{type}</td>
            <td>{+price}</td>
            <td>{inStock}</td>
            <td>
              <button type="button" onClick={this.handleEditClick}>
                Edit
              </button>
            </td>
            <td>
              <button type="button">Remove</button>
            </td>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

AdminProduct.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    inStock: PropTypes.string.isRequired,
  }).isRequired,
};
