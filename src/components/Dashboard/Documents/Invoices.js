import React, { Component } from 'react';
import AddInvoiceForm from './AddInvoiceForm';

export default class Invoices extends Component {
  state = {
    isVisibleAddInvoice: false
  };

  static propTypes = {};

  handleClick = () => {
    this.setState(state => ({
      isVisibleAddInvoice: !state.isVisibleAddInvoice
    }));
  };

  render() {
    return (
      <div>
        <button
          className="btn btn-submit -longer"
          type="button"
          onClick={this.handleClick}
        >
          Add invoice
        </button>
        {this.state.isVisibleAddInvoice && <AddInvoiceForm />}
      </div>
    );
  }
}
