import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAuthStatus } from '../../store/auth/selectors';
import { logoutSucces } from '../../store/auth/actionCreator';

export class Authorization extends Component {
  render() {
    const {
      auth, withAuth, withOutAuth, logout, handleLogout,
    } = this.props;
    if (logout) return logout(handleLogout);
    if (auth) return withAuth;
    return withOutAuth;
  }
}

const mapStateToProps = state => ({
  auth: getAuthStatus(state),
});

export default connect(
  mapStateToProps,
  { handleLogout: logoutSucces },
)(Authorization);

Authorization.propTypes = {
  withAuth: PropTypes.element,
  withOutAuth: PropTypes.element,
  logout: PropTypes.func,
  auth: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func,
};

Authorization.defaultProps = {
  logout: null,
  withAuth: null,
  withOutAuth: null,
  handleLogout: null,
};
