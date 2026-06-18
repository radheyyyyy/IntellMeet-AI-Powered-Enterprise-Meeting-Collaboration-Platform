import mongoose from "mongoose";

const messageSchema =
  new mongoose.Schema(
    {
      meeting: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Meeting",
        required: true,
      },

      sender: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      content: {
        type: String,
        required: true,
        trim: true,
      },

      messageType: {
        type: String,
        enum: [
          "TEXT",
          "SYSTEM",
          "FILE",
        ],
        default: "TEXT",
      },
    },
    {
      timestamps: true,
    }
  );

const Message =
  mongoose.model(
    "Message",
    messageSchema
  );

export default Message;
