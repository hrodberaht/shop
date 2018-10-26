import React, { Component } from 'react';
import Auth from './components/Auth/Auth';
import ConnectedAuthorization from './components/Auth/Authorization';
import Dashboard from './components/Dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <div>
        <ConnectedAuthorization withAuth={<Dashboard />} withOutAuth={<Auth />} />
      </div>
    );
  }
}

export default App;
