import React, { Component } from 'react';
import AddInvoiceForm from './AddInvoiceForm';

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
        {this.state.isVisableAddInvoice && <AddInvoiceForm />}
      </div>
    );
  }
}
