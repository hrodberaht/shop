import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAuthError } from '../../store/auth/selectors';
import { login } from '../../store/auth/actionCreator';

export class LoginForm extends Component {
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
        <label className="form-label" htmlFor="email">
          <p>Email:</p>
          <input
            className="form-input"
            id="email"
            type="text"
            value={email}
            onChange={this.handleChange}
            required
          />
        </label>
        <label className="form-label" htmlFor="password">
          <p>Password:</p>
          <input
            className="form-input"
            id="password"
            type="password"
            value={password}
            onChange={this.handleChange}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <p className="error-text">{error}</p>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  error: getAuthError(state),
});

export default connect(
  mapStateToProps,
  { handleLogin: login },
)(LoginForm);

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  error: PropTypes.string,
};

LoginForm.defaultProps = {
  error: null,
};
