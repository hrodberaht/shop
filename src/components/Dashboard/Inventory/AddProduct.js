import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reset } from 'redux-form';
import ConnectedAddProductForm from './AddProductForm';
import { addProduct } from '../../../store/products/actionCreators';
import { getAuthToken } from '../../../store/auth/selectors';

export class AddProduct extends Component {
  submit = (values) => {
    const { addProductToDB, token, clearForm } = this.props;
    addProductToDB(values, token);
    clearForm('addProduct');
  };

  render() {
    return (
      <div className="add-product-inventory">
        <ConnectedAddProductForm onSubmit={this.submit} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: getAuthToken(state),
});

export default connect(
  mapStateToProps,
  {
    addProductToDB: addProduct,
    clearForm: reset,
  },
)(AddProduct);

AddProduct.propTypes = {
  token: PropTypes.string.isRequired,
  addProductToDB: PropTypes.func.isRequired,
  clearForm: PropTypes.func.isRequired,
};
