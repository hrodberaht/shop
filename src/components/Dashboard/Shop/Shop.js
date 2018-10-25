import React, { Component } from 'react';
import ConnectedProductsList from './ProductsList';

export default class Shop extends Component {
  render() {
    return (
      <div className="shop">
        <ConnectedProductsList />
      </div>
    );
  }
}
