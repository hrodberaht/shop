import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Invoices extends Component {
  state = {
    isVisableAddInvoice: false,
  };

  static propTypes = {
    prop: PropTypes,
  };

  toggleAddInvoice = () => {
    this.setState(state => ({ isVisableAddInvoice: !state.isVisableAddInvoicee }));
  };

  render() {
    return (
      <div>
        <button type="button" onClick={this.toggleAddInvoice}>
          Add invoice
        </button>
        {this.state.isVisableAddInvoice && <p>Form</p>}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Invoices);
