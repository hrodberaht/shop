import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAuthStatus, getAuthError } from '../../store/auth/selectors';
import { login } from '../../store/auth/actionCreator';

export class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  resetState = () => {
    this.setState({
      email: '',
      password: '',
    });
  };

  handleSubmit = (e) => {
    const { email, password } = this.state;
    const { handleLogin } = this.props;
    e.preventDefault();
    this.resetState();
    handleLogin(email, password);
  };

  render() {
    const { email, password } = this.state;
    const { error } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="email">
          <p>Email:</p>
          <input id="email" type="text" value={email} onChange={this.handleChange} />
        </label>
        <label htmlFor="password">
          <p>Password:</p>
          <input id="password" type="password" value={password} onChange={this.handleChange} />
        </label>
        <button type="submit">Log In</button>
        <p>{error}</p>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  auth: getAuthStatus(state),
  error: getAuthError(state),
});

export default connect(
  mapStateToProps,
  { handleLogin: login },
)(Login);

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  error: PropTypes.string,
};

Login.defaultProps = {
  error: null,
};
