const pubsub = require('./pubsub');
const CHATS = require('../chats');

const CHAT_CHANNEL = 'CHAT_CHANNEL';

const resolvers = {
  Query: {
    chats() {
      return CHATS;
    },
  },

  Mutation: {
    sendMessage(root, { from, message }) {
      const newMessage = {
        id: CHATS.length,
        from,
        message,
      };

      CHATS.push(newMessage);

      pubsub.publish(CHAT_CHANNEL, { messageSent: newMessage });

      return newMessage;
    },
  },

  Subscription: {
    messageSent: {
      subscribe: () => pubsub.asyncIterator(CHAT_CHANNEL),
    },
  },
};

module.exports = resolvers;
