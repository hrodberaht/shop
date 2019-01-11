import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { connect } from 'react-redux';

const schema = yup.object().shape({
  name: yup.string().required(),
  imgUrl: yup.string().required(),
  type: yup.string().required(),
  price: yup
    .number()
    .min(1)
    .required(),
  inStock: yup
    .number()
    .min(0)
    .required(),
});

const asyncValidate = values => schema.validate(values, { abortEarly: false }).catch((err) => {
  const errorsForm = {};
  err.inner.forEach((error) => {
    errorsForm[error.path] = error.type;
  });
  throw errorsForm;
});

const toNumber = value => +value;

export class AddProductForm extends Component {
  renderField = ({ input, type, meta: { touched, error } }) => (
    <div>
      <p>
        <input className="form-input" {...input} type={type} />
      </p>
      {touched && error && <p className="error-text">{error}</p>}
    </div>
  );

  render() {
    const { handleSubmit, pristine } = this.props;

    return (
      <div className="product-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            <p>Name:</p>
            <Field id="name" name="name" component={this.renderField} type="text" />
          </label>
          <label htmlFor="imgUrl">
            <p>ImgUrl:</p>
            <Field id="imgUrl" name="imgUrl" component={this.renderField} type="text" />
          </label>
          <label htmlFor="type">
            <p>Type:</p>
            <Field id="type" name="type" component={this.renderField} type="text" />
          </label>
          <label htmlFor="price">
            <p>Price:</p>
            <Field
              id="price"
              name="price"
              parse={toNumber}
              component={this.renderField}
              type="number"
            />
          </label>
          <label htmlFor="inStock">
            <p>Stock:</p>
            <Field
              id="inStock"
              name="inStock"
              parse={toNumber}
              component={this.renderField}
              type="number"
            />
          </label>
          <button className="btn btn-submit" type="submit" disabled={pristine}>
            Add
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  initialValues: ownProps.product,
  form: ownProps.product ? ownProps.product.id : 'addProduct',
});

export default connect(mapStateToProps)(
  reduxForm({
    asyncValidate,
    enableReinitialize: true,
    form: 'addProduct',
  })(AddProductForm),
);

AddProductForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
