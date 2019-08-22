require('dotenv').config();

const express = require('express');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const applyRestRoutes = require('./rest/applyRestRoutes');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    path: `ws://${HOST}:${PORT}/subscriptions`,
    onConnect(...args) {
      console.log(args);
    },
  },
});

const app = express();

applyRestRoutes(app);

apolloServer.applyMiddleware({ app });

const server = createServer(app);

server.listen(PORT, () => {
  // eslint-disable-next-line no-new
  new SubscriptionServer({
    execute,
    subscribe,
    schema: apolloServer.schema,
  }, {
    server,
    path: '/subscriptions',
  });
});
