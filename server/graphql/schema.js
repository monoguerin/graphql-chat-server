const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Chat {
    id: Int!
    from: String!
    message: String!
  }

  type Query {
    chats: [Chat]
  }

  type Mutation {
    sendMessage(from: String!, message: String!): Chat
  }

  type Subscription {
    messageSent: Chat
  }
`;

module.exports = typeDefs;
