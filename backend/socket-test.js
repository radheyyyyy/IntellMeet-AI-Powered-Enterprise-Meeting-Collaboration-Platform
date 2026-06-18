import { io } from "socket.io-client";

const socket = io(
  "http://localhost:5000"
);

socket.on(
  "connect",
  () => {

    console.log(
      "Connected:",
      socket.id
    );

    socket.emit(
      "register-user",
      "test-user-123"
    );

    socket.emit(
      "join-room",
      "meeting-123"
    );
  }
);

socket.on(
  "online-users",
  (users) => {

    console.log(
      "Online Users:",
      users
    );
  }
);

socket.on(
  "user-joined-room",
  (data) => {

    console.log(
      "Joined Room:",
      data
    );
socket.emit(
  "create-notification",
  {
    recipientId:
      "test-user-123",

    title:
      "Meeting Started",

    message:
      "Sprint Planning Meeting has started."
  }
);
    // Start Typing
    socket.emit(
      "typing-start",
      {
        meetingId:
          "meeting-123",
        userId:
          "test-user-123"
      }
    );

    // Simulate typing for 2 sec
    setTimeout(() => {

      socket.emit(
        "typing-stop",
        {
          meetingId:
            "meeting-123",
          userId:
            "test-user-123"
        }
      );

      socket.emit(
        "send-message",
        {
          meetingId:
            "meeting-123",
          senderId:
            "test-user-123",
          message:
            "Hello IntellMeet 🚀"
        }
      );

    }, 2000);

    // Leave after 5 sec
    setTimeout(() => {

      console.log(
        "Leaving Room..."
      );

      socket.emit(
        "leave-room",
        "meeting-123"
      );

    }, 5000);
  }
);

socket.on(
  "user-typing",
  (data) => {

    console.log(
      "Typing:",
      data
    );
  }
);

socket.on(
  "user-stop-typing",
  (data) => {

    console.log(
      "Stopped Typing:",
      data
    );
  }
);

socket.on(
  "receive-message",
  (data) => {

    console.log(
      "Message Received:",
      data
    );
  }
);

socket.on(
  "user-left-room",
  (data) => {

    console.log(
      "Left Room:",
      data
    );
  }
);

socket.on(
  "disconnect",
  () => {

    console.log(
      "Disconnected"
    );
  }
);

socket.on(
  "connect_error",
  (error) => {

    console.log(
      "Connection Error:",
      error.message
    );
  }
);
socket.on(
  "receive-notification",
  (data) => {

    console.log(
      "Notification:",
      data
    );
  }
);