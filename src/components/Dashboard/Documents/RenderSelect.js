import React from 'react';
import ShowErrorInForm from './ShowErrorInForm';

const RenderSelect = ({ input, children, meta }) => (
  <div>
    <label htmlFor="vat">VAT: </label>
    <select className="invoice-select" {...input}>
      {children}
    </select>
    <ShowErrorInForm className="error-text" {...meta} />
  </div>
);

export default RenderSelect;
