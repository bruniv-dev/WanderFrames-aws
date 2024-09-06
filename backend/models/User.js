import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  bio: {
    type: String,
    default: "Hi, I'm excited to share my travel stories.",
  },
  profileImage: {
    type: String,
    default:
      "https://yourteachingmentor.com/wp-content/uploads/2020/12/istockphoto-1223671392-612x612-1.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
  ],
  favorites: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  securityQuestion: {
    type: String,
    required: true,
  },
  securityAnswer: {
    type: String,
    required: true,
  },
  securityQuestion: {
    type: String,
    required: true,
  },
  securityAnswer: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "User",
  },
});

export default model("User", userSchema);
