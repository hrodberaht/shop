import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ConnectedAuthorization from '../Auth/Authorization';

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
          <ConnectedAuthorization
            render
            withRoleAdmin={(
              <li className="item">
                <Link to="/admin">Admin</Link>
              </li>
)}
          />
          <ConnectedAuthorization
            logout={logout => (
              <li className="item">
                <Link to="/" onClick={logout}>
                  Logout
                </Link>
              </li>
            )}
          />
        </ul>
      </div>
    );
  }
}
