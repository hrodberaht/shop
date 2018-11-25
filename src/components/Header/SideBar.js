import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import ConnectedAuthorization from '../Auth/Authorization';
import { getNavigationSidebarValue } from '../../store/navigation/selectors';

export class SideBar extends Component {
  render() {
    const { toggleSidebar } = this.props;
    return (
      <div className={classNames({ sidebarHide: !toggleSidebar, sidebar: toggleSidebar })}>
        <ul className="sidebar__list">
          <li className="item">
            <Link to="/">Logo</Link>
          </li>
          <hr />
          <li className="item">
            <NavLink exact to="/">
              Shop
            </NavLink>
          </li>
          <li className="item">
            <NavLink to="/orders">Orders</NavLink>
          </li>
          <li className="item">
            <NavLink to="/cart">Cart</NavLink>
          </li>
          <li className="item">
            <NavLink to="/wishlist">Wish list</NavLink>
          </li>
          <ConnectedAuthorization
            render
            withRoleAdmin={(
              <li className="item">
                <NavLink to="/inventory">Inventory</NavLink>
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

const mapStateToProps = state => ({
  toggleSidebar: getNavigationSidebarValue(state),
});

export default withRouter(connect(mapStateToProps)(SideBar));

SideBar.propTypes = {
  toggleSidebar: PropTypes.bool.isRequired,
};
