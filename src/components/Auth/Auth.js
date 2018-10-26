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
            <Route exact path="/" component={ConnectedLoginForm} />
            <Route path="/registration" component={ConnectedRegistration} />
            <Route component={() => <p>Not Found</p>} />
          </Switch>
        </Router>
      </div>
    );
  }
}
