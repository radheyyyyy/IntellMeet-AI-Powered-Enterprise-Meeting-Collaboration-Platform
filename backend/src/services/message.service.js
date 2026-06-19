import Message from "../models/message.model.js";

export const createMessage =
  async ({
    meeting,
    sender,
    content,
    messageType =
      "TEXT",
  }) => {

    const message =
      await Message.create({
        meeting,
        sender,
        content,
        messageType,
      });

    return message;
  };

export const getMeetingMessages =
  async (meetingId) => {

    return await Message.find({
      meeting:
        meetingId,
    })
      .populate(
        "sender",
        "firstName lastName email"
      )
      .sort({
        createdAt: 1,
      });
  };

export const deleteMessage =
  async (
    messageId
  ) => {

    return await Message.findByIdAndDelete(
      messageId
    );
  };
  
  