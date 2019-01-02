import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import applyRounded from '../../../shared/applyRounded';

import 'react-datepicker/dist/react-datepicker.css';

const asyncValidate = values => console.log(values);

export class AddInvoiceForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  submit = values => console.log(values);

  parseToNumber = value => +value;

  parseToRoundedAmount = value => +applyRounded(+value);

  renderDataPick = ({ input: { onChange, value } }) => (
    <DatePicker selected={value} onChange={onChange} dateFormat="yyyy/MM/dd" />
  );

  renderField = ({ input, label, type }) => (
    <div>
      <label>{label}</label>
      <input {...input} type={type} />
    </div>
  );

  renderFieldWithOnChenge = ({ input, label, type }) => (
    <div>
      <label>{label}</label>
      <input {...input} type={type} />
    </div>
  );

  renderProducts = ({ fields }) => (
    <React.Fragment>
      <ol>
        {fields.map((product, index) => (
          <li key={`${product}`}>
            <button type="button" onClick={() => fields.remove(index)}>
              X
            </button>
            <Field
              name={`${product}.ean`}
              component={this.renderFieldWithOnChenge}
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
              name={`${product}.price`}
              component={this.renderField}
              label="Net price: "
              type="number"
              parse={this.parseToRoundedAmount}
            />
            <label>VAT: </label>
            <Field name={`${product}.vat`} component="select">
              <option />
              <option value="0">0%</option>
              <option value="5">5%</option>
              <option value="8">8%</option>
              <option value="23">23%</option>
            </Field>
            <Field
              name={`${product}.total`}
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
    </React.Fragment>
  );

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <label htmlFor="date">Date: </label>
        <Field format={value => value || null} name="date" component={this.renderDataPick} />
        <Field name="company" component={this.renderField} label="Company: " type="text" />
        <Field name="number" component={this.renderField} label="Number: " type="text" />
        <FieldArray name="products" component={this.renderProducts} />
        <Field
          name="total"
          component={this.renderField}
          label="Total price: "
          type="number"
          parse={this.parseToRoundedAmount}
        />
        <p>
          <button type="submit">Add</button>
        </p>
      </form>
    );
  }
}

export default reduxForm({
  form: 'addInvoice',
  // asyncValidate,
})(AddInvoiceForm);
