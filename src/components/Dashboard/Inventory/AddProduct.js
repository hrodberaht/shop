import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConnectedAddProductForm from './AddProductForm';
import { addProduct } from '../../../store/products/actionCreator';
import { getAuthToken } from '../../../store/auth/selectors';

export class AddProduct extends Component {
  submit = (values) => {
    const { addProductToDB, token } = this.props;
    addProductToDB(values, token);
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
  },
)(AddProduct);

AddProduct.propTypes = {
  token: PropTypes.string.isRequired,
  addProductToDB: PropTypes.func.isRequired,
};
