import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAuthStatus, getAuthRole } from '../../store/auth/selectors';
import { logoutSuccess } from '../../store/auth/actionCreators';

export class Authorization extends Component {
  render() {
    const {
      auth,
      withAuth,
      withOutAuth,
      logout,
      withRoleAdmin,
      withNoAdmin,
      handleLogout,
      role,
      render,
    } = this.props;
    if (role === 'admin' && render) return withRoleAdmin;
    if (role !== 'admin' && render) return withNoAdmin;
    if (logout) return logout(handleLogout);
    if (auth) return withAuth;

    return withOutAuth;
  }
}

const mapStateToProps = state => ({
  auth: getAuthStatus(state),
  role: getAuthRole(state),
});

export default connect(
  mapStateToProps,
  { handleLogout: logoutSuccess },
)(Authorization);

Authorization.propTypes = {
  auth: PropTypes.bool.isRequired,
  withAuth: PropTypes.element,
  withOutAuth: PropTypes.element,
  logout: PropTypes.func,
  withRoleAdmin: PropTypes.element,
  withNoAdmin: PropTypes.element,
  handleLogout: PropTypes.func,
  role: PropTypes.string,
  render: PropTypes.bool,
};

Authorization.defaultProps = {
  withAuth: null,
  withOutAuth: null,
  logout: null,
  withRoleAdmin: null,
  withNoAdmin: null,
  handleLogout: null,
  role: null,
  render: false,
};
