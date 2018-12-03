import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Shop from './Shop/Shop';
import Cart from './Cart/Cart';
import OrdersList from './Order/OrdersList';
import Inventory from './Inventory/Inventory';
import Authorization from '../Auth/Authorization';
import Wishlist from './Wishlist/Wishlist';
import HeadBar from '../Header/HeadBar';
import SideBar from '../Header/SideBar';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Router>
          <React.Fragment>
            <SideBar />
            <div className="content">
              <HeadBar />
              <div className="board">
                <Switch>
                  <Route exact path="/" component={Shop} />
                  <Route path="/orders" component={OrdersList} />
                  <Route path="/cart" component={Cart} />
                  <Route path="/wishlist" component={Wishlist} />
                  <Authorization
                    render
                    withRoleAdmin={<Route path="/inventory" component={Inventory} />}
                    withNoAdmin={<Route component={() => <p>Not Found</p>} />}
                  />
                  <Route component={() => <p>Not Found</p>} />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}
