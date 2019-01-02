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

  countGrossPrice = ({ pcs, netPrice, vat }) => +applyRounded(pcs * netPrice * (1 + vat / 100));

  renderDataPick = ({ input: { onChange, value } }) => (
    <DatePicker selected={value} onChange={onChange} dateFormat="yyyy/MM/dd" />
  );

  renderField = ({ input, label, type }) => (
    <div>
      <label htmlFor={label}>{label}</label>
      <input {...input} type={type} />
    </div>
  );

  serchProductByEan = (ean) => {
    const { productsInStore } = this.props;
    const found = productsInStore.find(product => ean === product.id);
    return found ? found.name : null;
  };

  renderProducts = ({ fields, change }) => (
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
            <Field name={`${product}.vat`} component="select" parse={this.parseToNumber}>
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
  })(AddInvoiceForm),
);
