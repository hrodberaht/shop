import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import RenderField from './RenderField';
import parseToNumber from '../../../shared/parseToNumber';
import parseToRoundedAmount from '../../../shared/parseToRoundedAmount';
import RenderSelect from './RenderSelect';
import searchProductByEan from '../../../shared/searchProductByEan';
import applyRounded from '../../../shared/applyRounded';
import ShowErrorInForm from './ShowErrorInForm';

const setGrossPriceAfterValuesChanged = (change, value, index) =>
  change(`products[${index}].grossPrice`, +applyRounded(value));

const checkIfAllValuesAreSet = (pcs, netPrice, vat) =>
  pcs && netPrice && vat >= 0;

const countGrossPricePcs = (value, product, change, index) => {
  const { netPrice, vat } = product;
  const grossPrice = value * netPrice * (1 + vat / 100);
  return checkIfAllValuesAreSet(value, netPrice, vat)
    ? setGrossPriceAfterValuesChanged(change, grossPrice, index)
    : 0;
};

const countGrossPriceNetPrice = (value, product, change, index) => {
  const { pcs, vat } = product;
  const grossPrice = pcs * value * (1 + vat / 100);
  return checkIfAllValuesAreSet(pcs, value, vat)
    ? setGrossPriceAfterValuesChanged(change, grossPrice, index)
    : 0;
};

const countGrossPriceVat = (value, product, change, index) => {
  const { pcs, netPrice } = product;
  const grossPrice = pcs * netPrice * (1 + value / 100);
  return checkIfAllValuesAreSet(pcs, netPrice, value)
    ? setGrossPriceAfterValuesChanged(change, grossPrice, index)
    : 0;
};

const RenderProducts = ({ fields, change, meta, productsInStore }) => (
  <React.Fragment>
    <ol>
      {fields.map((product, index) => (
        <li key={`${product}`}>
          <button
            type="button"
            className="btn btn-danger -shorter"
            onClick={() => fields.remove(index)}
          >
            X
          </button>
          <hr />
          <Field
            name={`${product}.ean`}
            onChange={e =>
              change(
                `${product}.name`,
                searchProductByEan(e.target.value, productsInStore)
              )
            }
            component={RenderField}
            label="EAN: "
            type="text"
          />
          <Field
            name={`${product}.name`}
            component={RenderField}
            label="Name: "
            type="text"
          />
          <Field
            name={`${product}.pcs`}
            component={RenderField}
            label="Pcs: "
            type="number"
            parse={parseToNumber}
            onChange={e =>
              countGrossPricePcs(
                e.target.value,
                fields.get(index),
                change,
                index
              )
            }
          />
          <Field
            name={`${product}.netPrice`}
            component={RenderField}
            label="Net price: "
            type="number"
            parse={parseToRoundedAmount}
            onChange={e =>
              countGrossPriceNetPrice(
                e.target.value,
                fields.get(index),
                change,
                index
              )
            }
          />
          <Field
            name={`${product}.vat`}
            component={RenderSelect}
            className="registration-select"
            parse={parseToNumber}
            onChange={e =>
              countGrossPriceVat(
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
            component={RenderField}
            label="Gross price: "
            type="number"
            parse={parseToRoundedAmount}
          />
        </li>
      ))}
    </ol>
    <button
      type="button"
      className="btn btn-primary -longer"
      onClick={() => fields.push({})}
    >
      Add product
    </button>

    <ShowErrorInForm className="error-text" {...meta} />
  </React.Fragment>
);

RenderProducts.propTypes = {
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

export default RenderProducts;
