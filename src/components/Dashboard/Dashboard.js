import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Shop from './Shop/Shop';
import Header from '../Header/Header';
import ConnectedCart from './Cart/Cart';
import ConnectedOrdersList from './Order/OrdersList';
import Inventory from './Inventory/Inventory';
import ConnectedAuthorization from '../Auth/Authorization';
import ConnectedWishlist from './Wishlist/Wishlist';
import HeadBar from '../Header/HeadBar';

export default class Dashboard extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <div className="sidebar">
            <Header />
          </div>
          <div className="content">
            <HeadBar />
            <Switch>
              <Route exact path="/" component={Shop} />
              <Route path="/orders" component={ConnectedOrdersList} />
              <Route path="/cart" component={ConnectedCart} />
              <Route path="/wishlist" component={ConnectedWishlist} />
              <ConnectedAuthorization
                render
                withRoleAdmin={<Route path="/inventory" component={Inventory} />}
                withNoAdmin={<Route component={() => <p>Not Found</p>} />}
              />
              <Route component={() => <p>Not Found</p>} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}
