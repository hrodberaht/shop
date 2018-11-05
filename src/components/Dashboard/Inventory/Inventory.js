import React, { Component } from 'react';
import ConnectedAdminProductsList from './AdminProductsList';
import ConnectedAddProduct from './AddProduct';

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
      <div className="inventory">
        <button className="btn btn-primary" type="button" onClick={this.handleClick}>
          {this.state.toggleAddProduct ? <span>Close</span> : <span>Add new item</span>}
        </button>
        {this.state.toggleAddProduct && <ConnectedAddProduct />}
        <hr />
        <ConnectedAdminProductsList />
      </div>
    );
  }
}
