import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ConnectedAddProductForm from './AddProductForm';
import { removeProduct, updateProduct } from '../../../store/products/actionCreators';
import { getAuthToken } from '../../../store/authenticate/selectors';

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
        id, imgUrl, name, type, price, inStock, remove,
      },
    } = this.props;
    if (this.state.toggleEdit) {
      return (
        <React.Fragment>
          <td className="edit-form" colSpan="7">
            <button
              id="closeButton"
              className="btn btn-danger"
              type="button"
              onClick={this.handleEditClick}
            >
              Close
            </button>
            <ConnectedAddProductForm product={product} onSubmit={this.submit} />
          </td>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <td>{name}</td>
        <td>
          <img src={imgUrl} alt={type} />
        </td>
        <td>{type}</td>
        <td>{+price}</td>
        <td>{+inStock}</td>
        <td>
          <button
            id="editButton"
            className="admin-product__button"
            type="button"
            onClick={this.handleEditClick}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </td>
        <td>
          <button
            id="removeButton"
            className="admin-product__button"
            type="button"
            onClick={() => this.handleRemoveClick(id)}
            disabled={remove}
          >
            X
          </button>
        </td>
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
