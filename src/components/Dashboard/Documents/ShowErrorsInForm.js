import React from 'react';
import PropTypes from 'prop-types';

const ShowErrorsInForm = ({ submitFailed, touched, error }) => (
  <p>{submitFailed && touched && (error && <span>{error}</span>)}</p>
);

ShowErrorsInForm.defaultProps = {
  error: null,
};

ShowErrorsInForm.propTypes = {
  submitFailed: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default ShowErrorsInForm;
