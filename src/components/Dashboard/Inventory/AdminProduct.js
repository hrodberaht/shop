import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConnectedAddProductForm from './AddProductForm';
import { removeProduct, updateProduct } from '../../../store/products/actionCreators';
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

  submit = (values) => {
    const { updateProductInDB, token } = this.props;
    updateProductInDB(values, token);
  };

  render() {
    const {
      product,
      product: {
        id, name, type, price, inStock, remove,
      },
    } = this.props;
    return (
      <React.Fragment>
        {this.state.toggleEdit ? (
          <td colSpan="6">
            <ConnectedAddProductForm product={product} onSubmit={this.submit} />
            <button
              id="closeButton"
              className="btn btn-primary"
              type="button"
              onClick={this.handleEditClick}
            >
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
              <button
                id="editButton"
                className="btn btn-primary"
                type="button"
                onClick={this.handleEditClick}
              >
                Edit
              </button>
            </td>
            <td>
              <button
                id="removeButton"
                className="btn btn-danger"
                type="button"
                onClick={() => this.handleRemoveClick(id)}
                disabled={remove}
              >
                X
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
  {
    removeProd: removeProduct,
    updateProductInDB: updateProduct,
  },
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
  updateProductInDB: PropTypes.func.isRequired,
};
