import React, { Component } from 'react';
import FormAddProductForm from './AddProductForm';
import ConnectedProductsList from '../Shop/ProductsList';

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
          Add product
        </button>
        {this.state.toggleAddProduct && <FormAddProductForm />}
        <hr />
        <ConnectedProductsList />
      </div>
    );
  }
}
