// controllers/messageController.js
const messageService = require("../Services/messageService");

const messageController = {
  createGlobalMessage: async (req, res) => {
    try {
      const { userId, channelId, message } = req.body;
      const newMessage = await messageService.createGlobalMessage(
        userId,
        channelId,
        message
      );
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createPrivateMessage: async (req, res) => {
    try {
      const { senderId, receiverId, message } = req.body;
      const newMessage = await messageService.createPrivateMessage(
        senderId,
        receiverId,
        message
      );
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getGlobalMessages: async (req, res) => {
    try {
      const messages = await messageService.getGlobalMessages();

      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getPrivateMessages: async (req, res) => {
    try {
      const { userId, otherUserId } = req.params;
      const messages = await messageService.getPrivateMessages(
        userId,
        otherUserId
      );
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = messageController;
