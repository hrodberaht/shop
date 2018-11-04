import React, { Component } from 'react';
import FormAddProductForm from './AddProductForm';
import ConnectedAdminProductsList from './AdminProductsList';

export default class Inventory extends Component {
  state = {
    toggleAddProduct: false,
  };

  handleClick = () => {
    this.setState(state => ({
      toggleAddProduct: !state.toggleAddProduct,
    }));
  };

  render() {
    return (
      <div>
        <button type="button" onClick={this.handleClick}>
          {this.state.toggleAddProduct ? <span>Close</span> : <span>Add new item</span>}
        </button>
        {this.state.toggleAddProduct && <FormAddProductForm />}
        <hr />
        <ConnectedAdminProductsList />
      </div>
    );
  }
}
