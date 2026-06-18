import { Server } from "socket.io";

import {
  addUser,
  removeUser,
  getOnlineUsers,
  getUserSocket,
} from "./socketManager.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(
      `🔌 User Connected: ${socket.id}`
    );

    /*
    |--------------------------------------------------------------------------
    | Register User
    |--------------------------------------------------------------------------
    */

    socket.on(
      "register-user",
      (userId) => {
        if (!userId) return;

        addUser(
          userId,
          socket.id
        );

        io.emit(
          "online-users",
          getOnlineUsers()
        );

        console.log(
          `👤 Registered User: ${userId}`
        );
      }
    );

    /*
    |--------------------------------------------------------------------------
    | Join Meeting Room
    |--------------------------------------------------------------------------
    */

    socket.on(
      "join-room",
      (meetingId) => {
        if (!meetingId) return;

        const roomName =
          `meeting:${meetingId}`;

        socket.join(roomName);

        console.log(
          `${socket.id} joined ${roomName}`
        );

        io.to(roomName).emit(
          "user-joined-room",
          {
            socketId: socket.id,
            meetingId,
          }
        );
      }
    );

    /*
    |--------------------------------------------------------------------------
    | Leave Meeting Room
    |--------------------------------------------------------------------------
    */

    socket.on(
      "leave-room",
      (meetingId) => {
        if (!meetingId) return;

        const roomName =
          `meeting:${meetingId}`;

        socket.leave(roomName);

        io.to(roomName).emit(
          "user-left-room",
          {
            socketId: socket.id,
            meetingId,
          }
        );

        console.log(
          `${socket.id} left ${roomName}`
        );
      }
    );

    /*
    |--------------------------------------------------------------------------
    | Chat Events
    |--------------------------------------------------------------------------
    */

    socket.on(
      "send-message",
      (data) => {
        const {
          meetingId,
          senderId,
          message,
        } = data;

        if (
          !meetingId ||
          !senderId ||
          !message
        ) {
          return;
        }

        const roomName =
          `meeting:${meetingId}`;

        console.log(
          "💬 Chat:",
          senderId,
          message
        );

        io.to(roomName).emit(
          "receive-message",
          {
            senderId,
            message,
            createdAt:
              new Date(),
          }
        );
      }
    );

    /*
    |--------------------------------------------------------------------------
    | Typing Indicators
    |--------------------------------------------------------------------------
    */

    socket.on(
      "typing-start",
      (data) => {
        const {
          meetingId,
          userId,
        } = data;

        if (
          !meetingId ||
          !userId
        ) {
          return;
        }

        socket.to(
          `meeting:${meetingId}`
        ).emit(
          "user-typing",
          {
            userId,
          }
        );
      }
    );

    socket.on(
      "typing-stop",
      (data) => {
        const {
          meetingId,
          userId,
        } = data;

        if (
          !meetingId ||
          !userId
        ) {
          return;
        }

        socket.to(
          `meeting:${meetingId}`
        ).emit(
          "user-stop-typing",
          {
            userId,
          }
        );
      }
    );

    /*
    |--------------------------------------------------------------------------
    | Notifications
    |--------------------------------------------------------------------------
    */

    socket.on(
      "create-notification",
      (data) => {
        const {
          recipientId,
          title,
          message,
        } = data;

        if (
          !recipientId ||
          !title ||
          !message
        ) {
          return;
        }

        const targetSocket =
          getUserSocket(
            recipientId
          );

        if (!targetSocket) {
          return;
        }

        console.log(
          `🔔 Notification → ${recipientId}`
        );

        io.to(
          targetSocket
        ).emit(
          "receive-notification",
          {
            title,
            message,
            createdAt:
              new Date(),
          }
        );
      }
    );

    /*
    |--------------------------------------------------------------------------
    | Disconnect
    |--------------------------------------------------------------------------
    */

    socket.on(
      "disconnect",
      () => {
        console.log(
          `❌ User Disconnected: ${socket.id}`
        );

        removeUser(
          socket.id
        );

        io.emit(
          "online-users",
          getOnlineUsers()
        );
      }
    );
  });

  return io;
};

export const getIO = () => io;