import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import thunk from 'redux-thunk';
import rootReducer from './store/rootReducer';
import App from './App';
import * as serviceWorker from './serviceWorker';
import config from './config/config';

import './index.scss';

const client = new ApolloClient({
  uri: config.graphql,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

const AppWithProvider = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(<AppWithProvider />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
