import React, { Component } from 'react';

export default class LogIn extends Component {
  state = {
    login: '',
    password: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  resetState = () => {
    this.setState({
      login: '',
      password: '',
    });
  };

  handleSubmit = (e) => {
    const { login, password } = this.state;
    e.preventDefault();
    this.resetState();
    console.log(login, password);
  };

  render() {
    const { login, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="login">
          <p>Login:</p>
          <input id="login" type="text" value={login} onChange={this.handleChange} />
        </label>
        <label htmlFor="password">
          <p>Password:</p>
          <input id="password" type="password" value={password} onChange={this.handleChange} />
        </label>
        <button type="submit">Log In</button>
      </form>
    );
  }
}
