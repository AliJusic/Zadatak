const Message = require("../Models/Message");
const User = require("../Models/User");
const mongoose = require("mongoose");
const messageService = {
  createGlobalMessage: async (userId, channelId, messageText) => {
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //   throw new Error("Invalid userId format");
    // } else console.log("FINE");
    // console.log(userId);
    const userObjectId = mongoose.Types.ObjectId.createFromHexString(userId);
    console.log(userObjectId);
    // const channelId = new mongoose.Types.ObjectId(channelId);
    const message = new Message({
      user: userObjectId,
      chatType: "global",
      // channelId: channelId,
      message: messageText,
    });

    return message.save();
  },

  createPrivateMessage: async (senderId, receiverId, messageText) => {
    const message = new Message({
      user: senderId,
      chatType: "private",
      receiver: receiverId,
      message: messageText,
    });

    return message.save();
  },

  getGlobalMessages: async () => {
    return Message.find({ chatType: "global" }).populate("user", "name").exec();
  },

  getPrivateMessages: async (userId, otherUserId) => {
    return Message.find({
      chatType: "private",
      $or: [
        { user: userId, receiver: otherUserId },
        { user: otherUserId, receiver: userId },
      ],
    })
      .populate("user", "name")
      .populate("receiver")
      .exec();
  },
};

module.exports = messageService;
