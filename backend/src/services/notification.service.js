import Notification
  from "../models/notification.model.js";

export const createNotification =
  async ({
    recipient,
    title,
    message,
    type = "SYSTEM",
  }) => {

    return await Notification.create({
      recipient,
      title,
      message,
      type,
    });
  };

export const getUserNotifications =
  async (userId) => {

    return await Notification.find({
      recipient: userId,
    }).sort({
      createdAt: -1,
    });
  };

export const markNotificationAsRead =
  async (notificationId) => {

    return await Notification.findByIdAndUpdate(
      notificationId,
      {
        isRead: true,
      },
      {
        new: true,
      }
    );
  };

export const deleteNotification =
  async (
    notificationId
  ) => {

    return await Notification.findByIdAndDelete(
      notificationId
    );
  };