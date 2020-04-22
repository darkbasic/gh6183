import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Articles from './Articles';
import Article from './Article';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: '/graphql',
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Switch>
            <Route path="/:id" children={<Article />} />
            <Route path="/">
              <Articles />
            </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
