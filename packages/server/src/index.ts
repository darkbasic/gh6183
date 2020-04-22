import {ApolloServer, gql} from 'apollo-server';

const authors = [
  {id: 1, name: 'First author'},
  {id: 2, name: 'Second author'},
];

const articles = [
  {
    id: 1,
    title: 'First article',
    author: authors[0],
  },
  {
    id: 2,
    title: 'Second article',
    author: authors[1],
  },
  {
    id: 3,
    title: 'Third article',
    author: authors[0],
  },
];

const server = new ApolloServer({
  typeDefs: gql`
    type Author {
      id: ID!
      name: String!
    }

    type Article {
      id: ID!
      title: String!
      author: Author!
    }

    type Query {
      articles: [Article!]!
      article(id: String!): Article!
    }
  `,
  resolvers: {
    Query: {
      articles() {
        return articles;
      },
      article(root, {id}) {
        return articles[id - 1];
      },
    },
  },
});

server.listen().then(({url}) => console.log(`Server ready at ${url}`));
