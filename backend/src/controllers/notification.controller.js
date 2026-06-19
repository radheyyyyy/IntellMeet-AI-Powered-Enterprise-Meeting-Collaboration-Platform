import {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "../services/notification.service.js";

export const createNotificationController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const notification =
        await createNotification({
          recipient:
            req.body.recipient,

          title:
            req.body.title,

          message:
            req.body.message,

          type:
            req.body.type,
        });

      res.status(201).json({
        success: true,
        notification,
      });

    } catch (error) {
      next(error);
    }
  };

export const getNotificationsController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const notifications =
        await getUserNotifications(
          req.user._id
        );

      res.json({
        success: true,
        notifications,
      });

    } catch (error) {
      next(error);
    }
  };

export const markAsReadController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const notification =
        await markNotificationAsRead(
          req.params.id
        );

      res.json({
        success: true,
        notification,
      });

    } catch (error) {
      next(error);
    }
  };

export const deleteNotificationController =
  async (
    req,
    res,
    next
  ) => {
    try {

      await deleteNotification(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Notification deleted",
      });

    } catch (error) {
      next(error);
    }
  };