import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Shop from './Shop/Shop';
import Header from '../Header/Header';

export default class Dashboard extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Shop} />
            <Route path="/orders" component={() => <p>Orders</p>} />
            <Route path="/cart" component={() => <p>Cart</p>} />
            <Route component={() => <p>Not Found</p>} />
          </Switch>
        </div>
      </Router>
    );
  }
}
