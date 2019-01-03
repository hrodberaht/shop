import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  reduxForm, Field, FieldArray, formValueSelector,
} from 'redux-form';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import applyRounded from '../../../shared/applyRounded';

import 'react-datepicker/dist/react-datepicker.css';
import { addInvoicesSuccess } from '../../../store/documents/actionCreators';
import { getProductsAll } from '../../../store/products/selectors';

const selector = formValueSelector('addInvoice');
const validate = (values) => {
  const errors = {};
  if (!values.company) errors.company = 'Required';
  if (!values.date) errors.date = 'Required';
  if (!values.number) errors.number = 'Required';
  if (!values.total) errors.total = 'Required';

  const productsArrayErrors = [];
  if (!values.products) {
    errors.products = { _error: 'At least one product must be entered' };
  } else {
    const productErrors = {};
    values.products.forEach((product, productIndex) => {
      if (!product.ean) {
        productErrors.ean = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }

      if (!product.name) {
        productErrors.name = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }

      if (!product.pcs) {
        productErrors.pcs = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }

      if (!product.netPrice) {
        productErrors.netPrice = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }

      if (!product.vat) {
        productErrors.vat = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }

      if (!product.grossPrice) {
        productErrors.grossPrice = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }
    });

    errors.products = productsArrayErrors;
  }
  return errors;
};

export class AddInvoiceForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  submit = (values) => {
    const { addInvoice } = this.props;
    addInvoice(values);
  };

  parseToNumber = value => +value;

  parseToRoundedAmount = value => +applyRounded(+value);

  countGrossPrice = ({ pcs, netPrice, vat }) => (pcs && netPrice && vat ? +applyRounded(pcs * netPrice * (1 + vat / 100)) : 0);

  renderDataPick = ({ input: { onChange, value }, meta: { error, submitFailed } }) => (
    <React.Fragment>
      <DatePicker selected={value} onChange={onChange} dateFormat="yyyy/MM/dd" />
      <p>{submitFailed && error && <span>{error}</span>}</p>
    </React.Fragment>
  );

  renderField = ({
    input, label, type, meta: { error, touched },
  }) => (
    <div>
      <label htmlFor={label}>{label}</label>
      <input {...input} type={type} />
      <p>{touched && (error && <span>{error}</span>)}</p>
    </div>
  );

  renderSelect = ({ input, children, meta: { touched, error } }) => (
    <React.Fragment>
      <select {...input}>{children}</select>
      {touched && error && <p>{error}</p>}
    </React.Fragment>
  );

  serchProductByEan = (ean) => {
    const { productsInStore } = this.props;
    const found = productsInStore.find(product => ean === product.id);
    return found ? found.name : null;
  };

  renderProducts = ({ fields, change, meta: { error, submitFailed } }) => (
    <React.Fragment>
      <ol>
        {fields.map((product, index) => (
          <li key={`${product}`}>
            <button type="button" onClick={() => fields.remove(index)}>
              X
            </button>
            <Field
              name={`${product}.ean`}
              onChange={e => change(`${product}.name`, this.serchProductByEan(e.target.value))}
              component={this.renderField}
              label="EAN: "
              type="text"
            />
            <Field
              name={`${product}.name`}
              component={this.renderField}
              label="Name: "
              type="text"
            />
            <Field
              name={`${product}.pcs`}
              component={this.renderField}
              label="Pcs: "
              type="number"
              parse={this.parseToNumber}
            />
            <Field
              name={`${product}.netPrice`}
              component={this.renderField}
              label="Net price: "
              type="number"
              parse={this.parseToRoundedAmount}
            />
            <label htmlFor="vat">VAT: </label>
            <Field name={`${product}.vat`} component={this.renderSelect} parse={this.parseToNumber}>
              <option />
              <option value="0">0%</option>
              <option value="5">5%</option>
              <option value="8">8%</option>
              <option value="23">23%</option>
            </Field>
            <Field
              name={`${product}.grossPrice`}
              component={this.renderField}
              label="Gross price: "
              type="number"
              parse={this.parseToRoundedAmount}
              onFocus={() => change(
                `products[${index}].grossPrice`,
                this.countGrossPrice(fields.getAll()[index]),
              )
              }
            />
          </li>
        ))}
      </ol>
      <button type="button" onClick={() => fields.push({})}>
        Add product
      </button>
      <p>{submitFailed && error && <span>{error}</span>}</p>
    </React.Fragment>
  );

  render() {
    const { handleSubmit, products, change } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <label htmlFor="date">Date: </label>
        <Field format={value => value || null} name="date" component={this.renderDataPick} />
        <Field name="company" component={this.renderField} label="Company: " type="text" />
        <Field name="number" component={this.renderField} label="Number: " type="text" />
        <FieldArray name="products" component={this.renderProducts} change={change} />
        <Field
          name="total"
          component={this.renderField}
          label="Total price: "
          type="number"
          parse={this.parseToRoundedAmount}
          onFocus={() => change('total', products.reduce((sum, product) => sum + product.grossPrice, 0))
          }
        />
        <p>
          <button type="submit">Add</button>
        </p>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  products: selector(state, 'products'),
  productsInStore: getProductsAll(state),
});

export default connect(
  mapStateToProps,
  { addInvoice: addInvoicesSuccess },
)(
  reduxForm({
    form: 'addInvoice',
    validate,
  })(AddInvoiceForm),
);
