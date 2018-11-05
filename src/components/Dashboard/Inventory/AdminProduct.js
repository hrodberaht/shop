import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConnectedAddProductForm from './AddProductForm';
import { removeProduct } from '../../../store/products/actionCreator';
import { getAuthToken } from '../../../store/auth/selectors';

export class AdminProduct extends Component {
  state = {
    toggleEdit: false,
  };

  handleEditClick = () => {
    this.setState(state => ({
      toggleEdit: !state.toggleEdit,
    }));
  };

  handleRemoveClick = (id) => {
    const { removeProd, token } = this.props;
    removeProd(id, token);
  };

  render() {
    const {
      product: {
        id, name, type, price, inStock, remove,
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
            <td>{+inStock}</td>
            <td>
              <button type="button" onClick={this.handleEditClick}>
                Edit
              </button>
            </td>
            <td>
              <button type="button" onClick={() => this.handleRemoveClick(id)} disabled={remove}>
                Remove
              </button>
            </td>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  token: getAuthToken(state),
});

export default connect(
  mapStateToProps,
  { removeProd: removeProduct },
)(AdminProduct);

AdminProduct.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    inStock: PropTypes.string.isRequired,
  }).isRequired,
  removeProd: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};
