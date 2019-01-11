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
      toggleModal: !state.toggleModal,
    }));
  };

  render() {
    const { toggleAddProduct } = this.state;
    return (
      <div className="inventory">
        {toggleAddProduct ? (
          <button className="btn btn-danger" type="button" onClick={this.handleClick}>
            <span>Close</span>
          </button>
        ) : (
          <button className="btn btn-submit" type="button" onClick={this.handleClick}>
            <span>Add new item</span>
          </button>
        )}

        {toggleAddProduct && <ConnectedAddProduct />}
        <hr />
        <ConnectedAdminProductsList />
      </div>
    );
  }
}
