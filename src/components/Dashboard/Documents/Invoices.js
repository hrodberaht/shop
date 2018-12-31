import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Invoices extends Component {
  state = {
    isVisableAddInvoice: false,
  };

  static propTypes = {};

  handleClick = () => {
    this.setState(state => ({ isVisableAddInvoice: !state.isVisableAddInvoice }));
  };

  render() {
    return (
      <div>
        <button type="button" onClick={this.handleClick}>
          Add invoice
        </button>
        {this.state.isVisableAddInvoice && <p>Form</p>}
      </div>
    );
  }
}
