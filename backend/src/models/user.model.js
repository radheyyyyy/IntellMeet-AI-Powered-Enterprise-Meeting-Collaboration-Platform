import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    username: {
      type: String,
      unique: true,
      sparse: true
    },

    password: {
      type: String,
      required: true,
      select: false
},

    refreshToken: {
      type: String,
      default: null,
      select: false
    },

    avatar: {
      type: String,
      default: ""
    },

    role: {
      type: String,
      enum: [
        "SUPER_ADMIN",
        "ADMIN",
        "MANAGER",
        "MEMBER"
      ],
      default: "MEMBER"
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    refreshToken: {
      type: String,
      default: null
    },

    lastLogin: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model(
  "User",
  userSchema
);

export default User;