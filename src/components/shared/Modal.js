import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  static propTypes = {
    handleCancelClick: PropTypes.func.isRequired,
    handleConfirmClick: PropTypes.func.isRequired,
  };

  render() {
    const { handleConfirmClick, handleCancelClick } = this.props;
    return ReactDOM.createPortal(
      <div className="modal">
        <div className="inner-modal">
          <h2>Are you sure?</h2>
          <div className="inner-modal__buttons">
            <button type="button" className="btn btn-submit" onClick={handleCancelClick}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={handleConfirmClick}>
              Confirm
            </button>
          </div>
        </div>
      </div>,
      document.body,
    );
  }
}
