import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  reduxForm,
  Field,
  FieldArray,
  formValueSelector,
  change as changeInDispatch
} from 'redux-form';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import { addInvoicesSuccess } from '../../../store/documents/actionCreators';
import { getProductsAll } from '../../../store/products/selectors';
import validate from '../../../shared/validationForInvoice';
import RenderField from './RenderField';
import RenderProducts from './RenderProducts';
import parseToRoundedAmount from '../../../shared/parseToRoundedAmount';
import RenderDataPick from './RenderDataPick';

const selector = formValueSelector('addInvoice');

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

export class AddInvoiceForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    addInvoice: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    productsInStore: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        imgUrl: PropTypes.string,
        type: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        inStock: PropTypes.number
      })
    ).isRequired
  };

  submit = values => {
    const { addInvoice, reset } = this.props;
    addInvoice(values);
    reset();
  };

  render() {
    const { handleSubmit, change, productsInStore } = this.props;
    return (
      <div className="invoice">
        <form onSubmit={handleSubmit(this.submit)}>
          <div className="invoice__date">
            <label htmlFor="date">Date: </label>
            <Field
              format={value => value || null}
              name="date"
              component={RenderDataPick}
            />
            <hr />
          </div>
          <div className="invoice__info">
            <Field
              name="company"
              component={RenderField}
              label="Company: "
              type="text"
            />
            <Field
              name="number"
              component={RenderField}
              label="Number: "
              type="text"
            />
            <hr />
          </div>
          <div className="invoice__products-list">
            <FieldArray
              name="products"
              component={RenderProducts}
              change={change}
              productsInStore={productsInStore}
            />
          </div>
          <div className="invoice__vat">
            <Field
              name="totalGrossPrice"
              component={RenderField}
              label="Total gross price: "
              type="number"
              format={parseToRoundedAmount}
              parse={parseToRoundedAmount}
            />
            <Field
              name="totalNetPrice"
              component={RenderField}
              label="Total net price: "
              type="number"
              format={parseToRoundedAmount}
              parse={parseToRoundedAmount}
            />
            <Field
              name="vat23"
              component={RenderField}
              label="VAT 23: "
              type="number"
              format={parseToRoundedAmount}
              parse={parseToRoundedAmount}
            />
            <Field
              name="vat8"
              component={RenderField}
              label="VAT 8: "
              type="number"
              format={parseToRoundedAmount}
              parse={parseToRoundedAmount}
            />
            <Field
              name="vat5"
              component={RenderField}
              label="VAT 5: "
              type="number"
              format={parseToRoundedAmount}
              parse={parseToRoundedAmount}
            />
          </div>
          <div className="invoice-add-button">
            <button className="btn btn-submit" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }
}

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
