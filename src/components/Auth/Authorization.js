import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAuthStatus } from '../../store/auth/selectors';

export class Authorization extends Component {
  render() {
    const { auth, withAuth, withOutAuth } = this.props;
    if (auth) return withAuth;

    return withOutAuth;
  }
}

const mapStateToProps = state => ({
  auth: getAuthStatus(state),
});

export default connect(mapStateToProps)(Authorization);

Authorization.propTypes = {
  withAuth: PropTypes.element.isRequired,
  withOutAuth: PropTypes.element.isRequired,
  auth: PropTypes.bool.isRequired,
};
