import {
  createMessage,
  getMeetingMessages,
  deleteMessage,
} from "../services/message.service.js";

export const createMessageController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const message =
  await createMessage({
    meeting:
      req.body.meeting,

    sender:
      req.user._id,

    content:
      req.body.content,

    messageType:
      req.body.messageType,
  });
  
  

      res.status(201).json({
        success: true,
        message,
      });

    } catch (error) {
      next(error);
    }
  };

export const getMeetingMessagesController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const messages =
        await getMeetingMessages(
          req.params
            .meetingId
        );

      res.json({
        success: true,
        messages,
      });

    } catch (error) {
      next(error);
    }
  };

export const deleteMessageController =
  async (
    req,
    res,
    next
  ) => {
    try {

      await deleteMessage(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Message deleted",
      });

    } catch (error) {
      next(error);
    }
  };