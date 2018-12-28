import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    handleNoClick: PropTypes.func.isRequired,
    handleYesClick: PropTypes.func.isRequired,
  };

  render() {
    const { className, handleYesClick, handleNoClick } = this.props;
    return ReactDOM.createPortal(
      <div className={className}>
        <p>Are you sure</p>
        <button type="button" onClick={handleYesClick}>
          Yes
        </button>
        <button type="button" onClick={handleNoClick}>
          No
        </button>
      </div>,
      document.body,
    );
  }
}
