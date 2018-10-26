import React, { Component } from 'react';
import ConnectedLoginForm from './LoginForm';

export default class Auth extends Component {
  render() {
    return (
      <div className="login-form">
        <ConnectedLoginForm />
      </div>
    );
  }
}
