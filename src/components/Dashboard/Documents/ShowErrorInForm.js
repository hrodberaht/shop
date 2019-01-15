import React from 'react';
import PropTypes from 'prop-types';

const ShowErrorInForm = ({ className, submitFailed, touched, error }) => (
  <p className={className}>
    {submitFailed && touched && (error && <span>{error}</span>)}
  </p>
);

ShowErrorInForm.defaultProps = {
  error: null,
  touched: true,
  submitFailed: false
};

ShowErrorInForm.propTypes = {
  submitFailed: PropTypes.bool,
  touched: PropTypes.bool,
  error: PropTypes.string,
  className: PropTypes.string.isRequired
};

export default ShowErrorInForm;
