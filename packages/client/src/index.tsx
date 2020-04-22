import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Articles from './Articles';
import Article from './Article';
import {ApolloProvider, ApolloClient, HttpLink, InMemoryCache, Reference} from '@apollo/client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          article(
            existingDataFromCache: Reference | undefined,
            {args, toReference},
          ) {
            return (
              existingDataFromCache ||
              (args?.id &&
                toReference({
                  __typename: 'Article',
                  id: args.id,
                }))
            );
          },
        },
      },
    },
  }),
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
