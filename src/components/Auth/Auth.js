import React, { Component } from 'react';
import ConnectedLogin from './LoginForm';

export default class Auth extends Component {
  render() {
    return (
      <div className="login-form">
        <ConnectedLogin />
      </div>
    );
  }
}
