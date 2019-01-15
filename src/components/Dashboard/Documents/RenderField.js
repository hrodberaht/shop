import React from 'react';
import ShowErrorInForm from './ShowErrorInForm';

const RenderField = ({ input, label, type, meta }) => (
  <div>
    <label htmlFor={label}>{label}</label>
    <input className="form-input" {...input} type={type} />
    <ShowErrorInForm className="error-text" {...meta} />
  </div>
);

export default RenderField;
