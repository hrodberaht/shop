import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ConnectedLoginForm from './LoginForm';
import ConnectedRegistration from './Registration';

export default class Auth extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/registration" component={ConnectedRegistration} />
            <Route path="/" component={ConnectedLoginForm} />
          </Switch>
        </Router>
      </div>
    );
  }
}
