import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAuthStatus, getAuthRole } from '../../store/auth/selectors';
import { logoutSucces } from '../../store/auth/actionCreator';

export class Authorization extends Component {
  render() {
    const {
      auth,
      withAuth,
      withOutAuth,
      logout,
      withRoleAdmin,
      handleLogout,
      role,
      render,
    } = this.props;
    if (role === 'admin' && render) return withRoleAdmin;
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
  { handleLogout: logoutSucces },
)(Authorization);

Authorization.propTypes = {
  auth: PropTypes.bool.isRequired,
  withAuth: PropTypes.element,
  withOutAuth: PropTypes.element,
  logout: PropTypes.func,
  withRoleAdmin: PropTypes.element,
  handleLogout: PropTypes.func,
  role: PropTypes.string,
  render: PropTypes.bool,
};

Authorization.defaultProps = {
  withAuth: null,
  withOutAuth: null,
  logout: null,
  withRoleAdmin: null,
  handleLogout: null,
  role: null,
  render: false,
};
