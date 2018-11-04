import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { addProduct } from '../../../store/products/actionCreator';
import { getAuthToken } from '../../../store/auth/selectors';

const schema = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required(),
  price: yup.number().required(),
  inStock: yup.number().required(),
});

const asyncValidate = values => schema.validate(values, { abortEarly: false }).catch((err) => {
  const errorsForm = {};
  err.inner.forEach((error) => {
    errorsForm[error.path] = error.type;
  });
  throw errorsForm;
});

export class AddProductForm extends Component {
  componentDidMount() {}

  submit = (values) => {
    const { addProductToDB, token } = this.props;
    addProductToDB(values, token);
  };

  renderField = ({ input, meta: { touched, error } }) => (
    <div>
      <div>
        <input {...input} />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );

  render() {
    const { handleSubmit, pristine } = this.props;
    return (
      <div className="product-form">
        <form onSubmit={handleSubmit(this.submit)}>
          <label htmlFor="name">
            <span>Name:</span>
            <Field id="name" name="name" component={this.renderField} />
          </label>
          <label htmlFor="type">
            <span>Type:</span>
            <Field id="type" name="type" component={this.renderField} />
          </label>
          <label htmlFor="price">
            <span>Price:</span>
            <Field id="price" name="price" component={this.renderField} />
          </label>
          <label htmlFor="inStock">
            <span>Stock:</span>
            <Field id="inStock" name="inStock" component={this.renderField} />
          </label>
          <button type="submit" disabled={pristine}>
            Add
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: getAuthToken(state),
});

const ConnectedAddProductForm = connect(
  mapStateToProps,
  { addProductToDB: addProduct },
)(AddProductForm);

export default reduxForm({
  asyncValidate,
  form: 'addProduct',
})(ConnectedAddProductForm);

AddProductForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
};
