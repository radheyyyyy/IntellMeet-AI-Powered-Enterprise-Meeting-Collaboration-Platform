import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    role: {
      type: String,
      enum: [
        "MEMBER",
        "MANAGER"
      ],
      default: "MEMBER"
    },

    joinedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    _id: false
  }
);

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    description: {
      type: String,
      default: ""
    },

    logo: {
      type: String,
      default: ""
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    members: [memberSchema],

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Team = mongoose.model(
  "Team",
  teamSchema
);

export default Team;