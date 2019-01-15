import React from 'react';
import DatePicker from 'react-datepicker';
import ShowErrorInForm from './ShowErrorInForm';

const RenderDataPick = ({ input: { onChange, value }, meta }) => (
  <React.Fragment>
    <DatePicker
      className="form-input"
      selected={value}
      onChange={onChange}
      dateFormat="yyyy/MM/dd"
    />
    <ShowErrorInForm className="error-text" {...meta} />
  </React.Fragment>
);

export default RenderDataPick;
