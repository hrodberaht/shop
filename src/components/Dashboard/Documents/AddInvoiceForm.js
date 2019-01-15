import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  reduxForm,
  Field,
  FieldArray,
  formValueSelector,
  change as changeInDispatch
} from 'redux-form';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import applyRounded from '../../../shared/applyRounded';

import 'react-datepicker/dist/react-datepicker.css';
import { addInvoicesSuccess } from '../../../store/documents/actionCreators';
import { getProductsAll } from '../../../store/products/selectors';
import ShowErrorInForm from './ShowErrorInForm';
import validate from '../../../shared/validationForInvoice';

const selector = formValueSelector('addInvoice');

export class AddInvoiceForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };

  submit = values => {
    const { addInvoice, reset } = this.props;
    addInvoice(values);
    reset();
  };

  parseToNumber = value => (value ? +value : 0);

  parseToRoundedAmount = value => (value ? +applyRounded(+value) : 0);

  setGrossPriceAfterValuesChanged = (change, value, index) =>
    change(`products[${index}].grossPrice`, +applyRounded(value));

  checkIfAllValuesAreSet = (pcs, netPrice, vat) => pcs && netPrice && vat;

  countGrossPricePcs = (value, product, change, index) => {
    const { netPrice, vat } = product;
    const grossPrice = value * netPrice * (1 + vat / 100);
    return this.checkIfAllValuesAreSet(value, netPrice, vat)
      ? this.setGrossPriceAfterValuesChanged(change, grossPrice, index)
      : 0;
  };

  countGrossPriceNetPrice = (value, product, change, index) => {
    const { pcs, vat } = product;
    const grossPrice = pcs * value * (1 + vat / 100);
    return this.checkIfAllValuesAreSet(pcs, value, vat)
      ? this.setGrossPriceAfterValuesChanged(change, grossPrice, index)
      : 0;
  };

  countGrossPriceVat = (value, product, change, index) => {
    const { pcs, netPrice } = product;
    const grossPrice = pcs * netPrice * (1 + value / 100);
    return this.checkIfAllValuesAreSet(pcs, netPrice, value)
      ? this.setGrossPriceAfterValuesChanged(change, grossPrice, index)
      : 0;
  };

  searchProductByEan = ean => {
    const { productsInStore } = this.props;
    const found = productsInStore.find(product => ean === product.id);
    return found ? found.name : null;
  };

  renderDataPick = ({ input: { onChange, value }, meta }) => (
    <React.Fragment>
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat="yyyy/MM/dd"
      />
      <ShowErrorInForm className="error-text" {...meta} />
    </React.Fragment>
  );

  renderField = ({ input, label, type, meta }) => (
    <div>
      <label htmlFor={label}>{label}</label>
      <input {...input} type={type} />
      <ShowErrorInForm className="error-text" {...meta} />
    </div>
  );

  renderSelect = ({ input, children, meta }) => (
    <React.Fragment>
      <select {...input}>{children}</select>
      <ShowErrorInForm className="error-text" {...meta} />
    </React.Fragment>
  );

  renderProducts = ({ fields, change, meta: { error, submitFailed } }) => (
    <React.Fragment>
      <ol>
        {fields.map((product, index) => (
          <li key={`${product}`}>
            <button type="button" onClick={() => fields.remove(index)}>
              X
            </button>
            <hr />
            <Field
              name={`${product}.ean`}
              onChange={e =>
                change(
                  `${product}.name`,
                  this.searchProductByEan(e.target.value)
                )
              }
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
              onChange={e =>
                this.countGrossPricePcs(
                  e.target.value,
                  fields.get(index),
                  change,
                  index
                )
              }
            />
            <Field
              name={`${product}.netPrice`}
              component={this.renderField}
              label="Net price: "
              type="number"
              parse={this.parseToRoundedAmount}
              onChange={e =>
                this.countGrossPriceNetPrice(
                  e.target.value,
                  fields.get(index),
                  change,
                  index
                )
              }
            />
            <label htmlFor="vat">VAT: </label>
            <Field
              name={`${product}.vat`}
              component={this.renderSelect}
              parse={this.parseToNumber}
              onChange={e =>
                this.countGrossPriceVat(
                  e.target.value,
                  fields.get(index),
                  change,
                  index
                )
              }
            >
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
    const { handleSubmit, change } = this.props;
    return (
      <div className="invoice">
        <form onSubmit={handleSubmit(this.submit)}>
          <div className="invoice__date">
            <label htmlFor="date">Date: </label>
            <Field
              format={value => value || null}
              name="date"
              component={this.renderDataPick}
            />
            <hr />
          </div>
          <div className="invoice__info">
            <Field
              name="company"
              component={this.renderField}
              label="Company: "
              type="text"
            />
            <Field
              name="number"
              component={this.renderField}
              label="Number: "
              type="text"
            />
            <hr />
          </div>
          <div className="invoice__products-list">
            <FieldArray
              name="products"
              component={this.renderProducts}
              change={change}
            />
          </div>
          <div className="invoice__vat">
            <Field
              name="totalGrossPrice"
              component={this.renderField}
              label="Total gross price: "
              type="number"
              format={this.parseToRoundedAmount}
              parse={this.parseToRoundedAmount}
            />
            <Field
              name="totalNetPrice"
              component={this.renderField}
              label="Total net price: "
              type="number"
              format={this.parseToRoundedAmount}
              parse={this.parseToRoundedAmount}
            />
            <Field
              name="vat23"
              component={this.renderField}
              label="VAT 23: "
              type="number"
              format={this.parseToRoundedAmount}
              parse={this.parseToRoundedAmount}
            />
            <Field
              name="vat8"
              component={this.renderField}
              label="VAT 8: "
              type="number"
              format={this.parseToRoundedAmount}
              parse={this.parseToRoundedAmount}
            />
            <Field
              name="vat5"
              component={this.renderField}
              label="VAT 5: "
              type="number"
              format={this.parseToRoundedAmount}
              parse={this.parseToRoundedAmount}
            />
          </div>
          <div className="invoice-add-button">
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    );
  }
}

const countVATS = (products, vat) =>
  products
    ? products.reduce(
        (sum, product) =>
          product.vat === vat
            ? sum + (product.grossPrice - product.netPrice * product.pcs)
            : sum + 0,
        0
      )
    : 0;

const countTotalGrossPrice = products =>
  products ? products.reduce((sum, product) => sum + product.grossPrice, 0) : 0;

const countTotalNetPrice = products =>
  products
    ? products.reduce((sum, product) => sum + product.netPrice * product.pcs, 0)
    : 0;

const setVatAndTotalPriceAfterValuesChanged = (products, dispatch) => {
  dispatch(changeInDispatch('addInvoice', 'vat23', countVATS(products, 23)));
  dispatch(changeInDispatch('addInvoice', 'vat8', countVATS(products, 8)));
  dispatch(changeInDispatch('addInvoice', 'vat5', countVATS(products, 5)));
  dispatch(
    changeInDispatch(
      'addInvoice',
      'totalGrossPrice',
      countTotalGrossPrice(products)
    )
  );
  dispatch(
    changeInDispatch(
      'addInvoice',
      'totalNetPrice',
      countTotalNetPrice(products)
    )
  );
};

const mapStateToProps = state => ({
  products: selector(state, 'products'),
  productsInStore: getProductsAll(state)
});

export default connect(
  mapStateToProps,
  { addInvoice: addInvoicesSuccess }
)(
  reduxForm({
    form: 'addInvoice',
    validate,
    onChange: (values, dispatch) =>
      setVatAndTotalPriceAfterValuesChanged(values.products, dispatch)
  })(AddInvoiceForm)
);
