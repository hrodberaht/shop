import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Shop from './Shop/Shop';
import Header from '../Header/Header';
import ConnectedCart from './Cart/Cart';
import ConnectedOrdersList from './Order/OrdersList';
import Inventory from './Inventory/Inventory';

export default class Dashboard extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Shop} />
            <Route path="/orders" component={ConnectedOrdersList} />
            <Route path="/cart" component={ConnectedCart} />
            <Route path="/admin" component={Inventory} />
            <Route component={() => <p>Not Found</p>} />
          </Switch>
        </div>
      </Router>
    );
  }
}
