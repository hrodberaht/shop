import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddInvoiceForm from './AddInvoiceForm';

export default class Invoices extends Component {
  state = {
    isVisableAddInvoice: true,
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
        {this.state.isVisableAddInvoice && <AddInvoiceForm />}
      </div>
    );
  }
}
