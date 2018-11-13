import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAuthError } from '../../store/auth/selectors';
import { login, clearLoginErrors } from '../../store/auth/actionCreators';

export class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  };

  componentWillUnmount() {
    this.props.clearLoginErrors();
  }

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
      <div>
        <div className="login-form">
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
            <button className="btn btn-submit" type="submit">
              Log In
            </button>
            <p className="error-text">{error}</p>
          </form>
          <div className="registartion-link ">
            <Link to="/registration">Registration</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: getAuthError(state),
});

export default connect(
  mapStateToProps,
  {
    handleLogin: login,
    clearLoginErrors,
  },
)(LoginForm);

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  clearLoginErrors: PropTypes.func,
  error: PropTypes.string,
};

LoginForm.defaultProps = {
  error: null,
  clearLoginErrors: null,
};
