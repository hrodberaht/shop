import React from 'react';
import PropTypes from 'prop-types';

const ShowErrorInForm = ({ className, touched, error }) => (
  <p className={className}>{touched && (error && <span>{error}</span>)}</p>
);

ShowErrorInForm.defaultProps = {
  error: null,
  touched: false,
  className: null
};

ShowErrorInForm.propTypes = {
  touched: PropTypes.bool,
  error: PropTypes.string,
  className: PropTypes.string
};

export default ShowErrorInForm;
