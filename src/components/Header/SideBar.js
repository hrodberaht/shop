import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import ConnectedAuthorization from '../Auth/Authorization';
import { getNavigationSidebarValue } from '../../store/navigation/selectors';

export class SideBar extends Component {
  render() {
    const { isSidebarVisible } = this.props;
    return (
      <div
        className={classNames({
          sidebarHide: !isSidebarVisible,
          sidebar: isSidebarVisible,
        })}
      >
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
          <li className="item">
            <NavLink to="/documents">Documents</NavLink>
          </li>
          <ConnectedAuthorization
            render
            withRoleAdmin={
              <li className="item">
                <NavLink to="/analytics">Analytics</NavLink>
              </li>
            }
          />
          <ConnectedAuthorization
            render
            withRoleAdmin={
              <li className="item">
                <NavLink to="/inventory">Inventory</NavLink>
              </li>
            }
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
  isSidebarVisible: getNavigationSidebarValue(state),
});

export default withRouter(connect(mapStateToProps)(SideBar));

SideBar.propTypes = {
  isSidebarVisible: PropTypes.bool.isRequired,
};
