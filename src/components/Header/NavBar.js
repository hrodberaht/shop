import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <ul className="nav-bar__list">
          <li className="item">
            <NavLink to="/">Shop</NavLink>
          </li>
          <li className="item">
            <NavLink to="/orders">Orders</NavLink>
          </li>
          <li className="item">
            <NavLink to="/cart">Cart</NavLink>
          </li>
          <li className="item">
            <NavLink to="/logout">Logout</NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
