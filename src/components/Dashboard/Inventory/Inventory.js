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
        {this.state.toggleAddProduct ? (
          <button className="btn btn-danger" type="button" onClick={this.handleClick}>
            <span>Close</span>
          </button>
        ) : (
          <button className="btn btn-primary" type="button" onClick={this.handleClick}>
            <span>Add new item</span>
          </button>
        )}

        {this.state.toggleAddProduct && <ConnectedAddProduct />}
        <hr />
        <ConnectedAdminProductsList />
      </div>
    );
  }
}
