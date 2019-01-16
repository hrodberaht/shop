import React from 'react';
import ShowErrorInForm from './ShowErrorInForm';

const RenderSelect = ({ input, children, meta, label }) => (
  <div>
    <label htmlFor={label}>{label}</label>
    <select className="invoice-select" {...input}>
      {children}
    </select>
    <ShowErrorInForm className="error-text" {...meta} />
  </div>
);

export default RenderSelect;
