const bodyParser = require('body-parser');
const CHATS = require('../chats');

function applyRestRoutes(app) {
  app.use(bodyParser.json());

  app.get('/chats', (req, res) => {
    res.json(CHATS);
  });

  app.post('/send-message', (req, res) => {
    const {
      message,
      from,
      fromName,
    } = req.body;

    const newMessage = {
      id: CHATS.length,
      message,
      from,
      fromName,
    };

    CHATS.push(newMessage);

    res.json({
      result: true,
    });
  });
}

module.exports = applyRestRoutes;
