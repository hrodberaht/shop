import React from 'react';
import ShowErrorInForm from './ShowErrorInForm';

const RenderSelect = ({ input, children, meta }) => (
  <React.Fragment>
    <select {...input}>{children}</select>
    <ShowErrorInForm className="error-text" {...meta} />
  </React.Fragment>
);

export default RenderSelect;
